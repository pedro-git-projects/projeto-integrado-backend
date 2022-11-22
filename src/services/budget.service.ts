import { BudgetManager } from "../interfaces/budget.interface";
import { HTTPException } from "../exceptions/HTTPException";
import { isEmpty } from "../utils/empty";
import budgetModel from "../models/budget.model";
import {CreateBudgetDto} from "../dto/budget.dto";
import {Status} from "../interfaces/status.enum";
import {Group} from "../interfaces/group.enum";
import {Document} from "mongoose";
import {CreateBillDTO} from "../dto/bill.dto";
import {getBudgetID} from "../utils/serivce.utils";

class BudgetService {
	public budgetModel = budgetModel;

	// root users can search the whole database, regular users only those entries created by them
	public async findBudget(userID: string, privilge: Group): Promise<BudgetManager[]> {
		if(isEmpty(userID) || isEmpty(privilge)) throw new HTTPException(401, "must be logged in");
		let budget: BudgetManager[]; 
		if(privilge == Group.root) { 
			budget = await this.budgetModel.find(); 
		} else {
			budget = await this.budgetModel.find({createdBy: userID});
		}
		return budget;
	} 

	// only root users can access this method 
	public async findBudgetByID(budgetID: string, group: Group, userID: string): Promise<BudgetManager|never> {
		if (isEmpty(budgetID)) throw new HTTPException(400, "ID is empty");
		if(group != Group.root) throw new HTTPException(401, "unauthorized");
		let findBudget: BudgetManager|null;		
		if(group == Group.root) {
			findBudget = await this.budgetModel.findOne({_id: budgetID}); 
		} else {
			findBudget = await this.budgetModel.findOne({_id: budgetID, createdBy: userID}); 
		}
		if(!findBudget) throw new HTTPException(409, "Budget manager doesn't exist");
		return findBudget;
	}

	// regular users automatically filter their own budget manager for status 
	// root users must specify the budget manager by ID
	public async findBillByStatus(budgetID: string, _status: string, group: Group, userID: string): Promise<BudgetManager|BudgetManager[]|never> {
		if(_status !== "Paid" && _status !== "Pending" && _status !== "Overdue") throw new HTTPException(422, `status ${_status} is not valid`);

		let selectedBills: BudgetManager|BudgetManager[]|null;
		if(group == Group.root) {
			if(isEmpty(budgetID)) throw new HTTPException(400, "missing ID");
			selectedBills = await this.budgetModel.find(
				{
					_id: budgetID
				}, {
					bills: {
						$filter: {
							input: "$bills",
							as: "bill", 
							cond: {
								$eq:["$$bill.status", _status]
							}
						}
					}
				});			
		} else {
			if(!isEmpty(budgetID)) throw new HTTPException(401, "unauthorized");
			const id = await getBudgetID(userID);
			selectedBills = await this.budgetModel.find(
				{
					_id: id,
					createdBy: userID
				}, {
					bills: {
						$filter: {
							input: "$bills",
							as: "bill", 
							cond: {
								$eq:["$$bill.status", _status]
							}
						}
					}
				});
		}
		return selectedBills;
	}

	// root users filter the document with desired id whilst regular users automatically fillter their database if exists 
	public async findBillByFrequency(budgetID: string, frequency: string, group: Group, userID: string): Promise<BudgetManager|BudgetManager[]> {
		if(isEmpty(frequency)) throw new HTTPException(400, "missing frequency"); 
		if(frequency !== "OneTime" && frequency !== "Recurring") throw new HTTPException(422, `frequency ${frequency} is not valid`);

		let selectedBills: BudgetManager|BudgetManager[]|null;
		if(group == Group.root) {
			if(isEmpty(budgetID)) throw new HTTPException(400, "missing ID");
			selectedBills = await this.budgetModel.find(
				{
					_id: budgetID
				}, {
					bills: {
						$filter: {
							input: "$bills",
							as: "bill", 
							cond: {
								$eq:["$$bill.frequency", frequency]
							}
						}
					}
				});
		} else {
			if(!isEmpty(budgetID)) throw new HTTPException(401, "unauthorized");
			const id = await getBudgetID(userID);
			selectedBills = await this.budgetModel.find(
				{
					_id: id,
					createdBy: userID
				}, {
					bills: {
						$filter: {
							input: "$bills",
							as: "bill", 
							cond: {
								$eq:["$$bill.frequency", frequency]
							}
						}
					}
				});
		}
		return selectedBills;
	}

	// finds a bill by title in all budget managers for root users, only in those budget managers created by the user otherwise
	public async findBillByTitle(budgetID: string, title: string, group: Group, userID: string): Promise<BudgetManager|BudgetManager[]|never> {
		if(isEmpty(title)) throw new HTTPException(400, "tilte is missing"); 
		let selectedBills: BudgetManager|BudgetManager[]|null; 

		if(group == Group.root) {
			if(isEmpty(budgetID)) throw new HTTPException(400, "budget ID is missing");
			selectedBills = await this.budgetModel.find(
				{
					_id: budgetID
				}, {
					bills: {
						$filter: {
							input: "$bills",
							as: "bill", 
							cond: {
								$eq:[{$toLower:"$$bill.title"}, title]
							}
						}
					} 
				}	
			);
		} else {
			if(!isEmpty(budgetID)) throw new HTTPException(401, "unauthorized");
			const id = await getBudgetID(userID);
			selectedBills = await this.budgetModel.find(
				{
					_id: id,
					createdBy: userID
				}, {
					bills: {
						$filter: {
							input: "$bills",
							as: "bill", 
							cond: {
								$eq:[{$toLower:"$$bill.title"}, title]
							}
						}
					} 
				}	
			);
		}
		if(!selectedBills) throw new HTTPException(409, "does not exist");
		return selectedBills;
	}


	// Creates any number of budget managers for root users, one if not exists for regular users
	public async createBudget(budgetData: CreateBudgetDto, group: Group, userID: string): Promise<BudgetManager> {
		if (isEmpty(group) || isEmpty(userID)) throw new HTTPException(401, "must be logged in");
		if(isEmpty(budgetData)) throw new HTTPException(400, "Budget data is empty");

		let createBudgetData: BudgetManager;	
		let testForMultiple: BudgetManager[];
		if(group != Group.root) {
			testForMultiple = await this.budgetModel.find({createdBy: userID});
			if(testForMultiple.length == 0) {
				createBudgetData =	await this.budgetModel.create({...budgetData});
			} else {
				throw new HTTPException(422, "each user can only have one budget manager");
			} 
		} else {

			createBudgetData =	await this.budgetModel.create({...budgetData});
		}

		return createBudgetData;
	}

	// root users can pay any bills, regular users, however, can pay only bills in budget managers they created
	// regular users only need to pass the bill id 
	public async payBill(budgetID: string, billID: string, group: Group, userID: string): Promise<BudgetManager> {
		if (isEmpty(group) || isEmpty(userID)) throw new HTTPException(401, "must be logged in");
		if (isEmpty(billID)) throw new HTTPException(400,"incomplete path");

		let selectedBudget: BudgetManager&Document|null; 
		const id = await getBudgetID(userID);
		if(group == Group.root) {
			if(isEmpty(budgetID)) throw new HTTPException(400, "missing budget ID");
			selectedBudget = await budgetModel.findOne({_id: budgetID});
		} else {
			if(!isEmpty(budgetID)) throw new HTTPException(401, "unauthorized");
			selectedBudget = await budgetModel.findOne({_id: id, createdBy: userID});
		}

		if(!selectedBudget) throw new HTTPException(404, "not found");

		const selectedBills = selectedBudget?.bills;
		if(!selectedBills) throw new HTTPException(404, "not found");

		const selectedBill = selectedBills.find(el => {
			return el._id == billID;
		});
		if(!selectedBill) throw new HTTPException(404, "not found");

		const selectedBillCost = selectedBill.cost; 

		if (selectedBill.status == Status.Paid) throw new HTTPException(422, "bill already paid");
		selectedBill.status = Status.Paid;

		const updated = await selectedBudget.save();
		if(!updated) throw new HTTPException(409, "conflict");


		let updateBalance: BudgetManager|null; 
		if(group == Group.root) {
			updateBalance = await this.budgetModel.findOneAndUpdate(
				{_id: budgetID},
				{
					$inc: {
						"totalBalance": - selectedBillCost 
					} 
				},
				{
					returnOriginal: false
				}
			);
		} else {
			updateBalance = await this.budgetModel.findOneAndUpdate(
				{_id: id},
				{
					$inc: {
						"totalBalance": - selectedBillCost 
					} 
				},
				{
					returnOriginal: false
				}
			); 
		}


		if(!updateBalance) throw new HTTPException(409, "does not exist");
		return updateBalance;
	}

	// everyone can update their balance, however only root users need to pass the budgetID
	public async updateBalance(budgetID: string, operation: string, balance: string, auth: Group, userID: string): Promise<BudgetManager|never> {
		if(isEmpty(balance) || isEmpty(operation)) throw new HTTPException(400, "incomplete path");
		if(isEmpty(auth)) throw new HTTPException(401, "unauthorized");

		const nBalance = Number(balance);
		if(nBalance == NaN) throw new HTTPException(422, "balance must be numeric");

		let updateBalance: BudgetManager|null = null;
		let searchID = auth === Group.root ? budgetID : await getBudgetID(userID);
		if(auth == Group.root) if(isEmpty(budgetID)) throw new HTTPException(400, "missing budget ID");

		switch(operation) {
			case("add"):
				updateBalance = await this.budgetModel.findByIdAndUpdate(
					searchID,
					{
						$inc: {"totalBalance": nBalance}
					},
					{
						returnOriginal: false
					}
			);
			break;

			case("sub"):
				updateBalance = await this.budgetModel.findByIdAndUpdate(
					searchID,
					{
						$inc : {"totalBalance": -nBalance}
					},
					{
						returnOriginal: false
					}
			);		
			break;

			case("set"):
				updateBalance = await this.budgetModel.findByIdAndUpdate(
					searchID,
					{
						$set : {"totalBalance": nBalance}
					},
					{
						returnOriginal: false
					}
				);
			break;

			default:
				throw new HTTPException(422, `invalid parameter ${operation}`);
		}


		if(!updateBalance) throw new HTTPException(409, "budget manager does not exist");
		return updateBalance;
	}

	// only root users can update budget managers
	public async updateBudget(ID: string, budgetData: CreateBudgetDto, group: Group): Promise<BudgetManager|never> {
		if (isEmpty(budgetData)) throw new HTTPException(400, "budget data is empty");
		if (group !== Group.root) throw new HTTPException(401, "unauthorized");
		const updateBudget: BudgetManager|null = await this.budgetModel.findByIdAndUpdate(ID, {...budgetData}, {returnOriginal: false});
		if(!updateBudget) throw new HTTPException(409, "budget manager does not exist");
		return updateBudget;
	}

	// root users can delete any budget managers, regular users can only delete their own
	// regular useres do not need to pass the budget ID
	public async deleteBudget(budgetID: string, group: Group, userID: string): Promise<BudgetManager> {
		if (isEmpty(group) || isEmpty(userID)) throw new HTTPException(401, "must be logged in");
		let deleteBudget: BudgetManager|null;

		if(group !== Group.root) {
			const id = await getBudgetID(userID);
			deleteBudget = await this.budgetModel.findByIdAndDelete(id);
		} else {
			deleteBudget = await this.budgetModel.findByIdAndDelete(budgetID);
		}

		if(!deleteBudget) throw new HTTPException(409, "budget Manager does not exist");
		return deleteBudget;
	}

	// regular users do not need to pass the budget ID as a parameter
	// root users must specify which budget they want to delete
	public async createBill(budgetID: string, billData: CreateBillDTO, group: Group, userID: string): Promise<BudgetManager> {
		if(isEmpty(billData)) throw new HTTPException(400, "missing bill data");
		let addedBill: BudgetManager|null;
		if(group !== Group.root) {
			const id = await getBudgetID(userID);
			addedBill = await this.budgetModel.findByIdAndUpdate(
				id,
				{$push: {bills: {...billData}}},
				{returnOriginal:false}
			);
		} else {
			if(isEmpty(budgetID)) throw new HTTPException(400, "missing budget id");
			addedBill = await this.budgetModel.findByIdAndUpdate(
				budgetID,
				{$push: {bills: {...billData}}},
				{returnOriginal:false}
			);
		}
		if(!addedBill) throw new HTTPException(404, "not found");
		return addedBill;
	}

	// root users can delete any bills, regular users can delete bills of budget managers created by them
	public async deleteBill(BudgetID:string, BillID: string, group: Group, userID: string): Promise <BudgetManager|never> {
		if(isEmpty(BudgetID) || isEmpty(BillID)) throw new HTTPException (400,"incomplete path");
		let updateBudget: BudgetManager|null;
		if(group == Group.root) {
			updateBudget = await this.budgetModel.findByIdAndUpdate(
				BudgetID, 
				{
					$pull: { bills: { _id: BillID } },
				}, 
				{returnOriginal: false}
			);
		} else {
			updateBudget = await this.budgetModel.findOneAndUpdate(
				{ _id: BudgetID, createdBy: userID }, 
				{
					$pull: { bills: { _id: BillID } },
				}, 
				{returnOriginal: false}
			);
		} 
		if(!updateBudget) throw new HTTPException(409, "Bill does not exist");

		return updateBudget;
	}
}

export default BudgetService;
