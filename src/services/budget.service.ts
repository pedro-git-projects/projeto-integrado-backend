import { BudgetManager } from "../interfaces/budget.interface";
import { HTTPException } from "../exceptions/HTTPException";
import { isEmpty } from "../utils/empty";
import budgetModel from "../models/budget.model";
import {CreateBudgetDto} from "../dto/budget.dto";
import {Status} from "../interfaces/status.enum";
import {Group} from "../interfaces/group.enum";

class BudgetService {
	public budgetModel = budgetModel;

	public async findBudget(): Promise<BudgetManager[]> {
		const budget: BudgetManager[] = await this.budgetModel.find();
		return budget;
	} 

	public async findBudgetByID(ID: string): Promise<BudgetManager|never> {
		if (isEmpty(ID)) throw new HTTPException(400, "ID is empty");
		const findBudget: BudgetManager|null = await this.budgetModel.findOne({_id: ID}); 
		if(!findBudget) throw new HTTPException(409, "Bill does't exist");
		return findBudget;
	}

	public async findBillByStatus(budgetID: string, _status: string): Promise<BudgetManager|BudgetManager[]|never> {
		if(isEmpty(budgetID || _status)) throw new HTTPException(400, "incomplete path"); 
		if(_status !== "Paid" && _status !== "Pending" && _status !== "Overdue") throw new HTTPException(422, `status ${_status} is not valid`);

		const selectedBills: BudgetManager|BudgetManager[]|null = await this.budgetModel.find(
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

			return selectedBills;
	}

	public async findBillByFrequency(budgetID: string, frequency: string): Promise<BudgetManager|BudgetManager[]|never> {
		if(isEmpty(budgetID || frequency)) throw new HTTPException(400, "incomplete path"); 
		if(frequency !== "OneTime" && frequency !== "Recurring") throw new HTTPException(422, `frequency ${frequency} is not valid`);
		const selectedBills: BudgetManager|BudgetManager[]|null = await this.budgetModel.find(
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

			return selectedBills;
	}

	public async findBillByTitle(budgetID: string, title: string): Promise<BudgetManager|BudgetManager[]|never> {
		if(isEmpty(budgetID) || isEmpty(title)) throw new HTTPException(400, "incomplete path"); 
		const selectedBills: BudgetManager|BudgetManager[]|null = await this.budgetModel.find(
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
		if(!selectedBills) throw new HTTPException(409, "does not exist");
		return selectedBills;
	}


	public async createBudget(budgetData: CreateBudgetDto): Promise<BudgetManager> {
		if(isEmpty(budgetData)) throw new HTTPException(400, "Budget data is empty");
		const createBudgetData: BudgetManager = await this.budgetModel.create({...budgetData});
		return createBudgetData;
	}

	public async payBill(budgetID: string, billID: string): Promise<BudgetManager> {
		if(isEmpty(budgetID) || isEmpty(billID)) throw new HTTPException(400,"incomplete path");

		const selectedBudget = await budgetModel.findOne({_id: budgetID});
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

		const updateBalance: BudgetManager|null = await this.budgetModel.findOneAndUpdate(
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

		if(!updateBalance) throw new HTTPException(409, "does not exist");
		return updateBalance;
	}

	public async updateBalance(ID: string, operation: string, balance: string, auth: string): Promise<BudgetManager|never> {
		if(isEmpty(ID) || isEmpty(balance) || isEmpty(operation)) throw new HTTPException(400, "incomplete path");
		if(isEmpty(auth) || auth !== Group.root) throw new HTTPException(401, "Unauthorized");

		const nBalance = Number(balance);
		if(nBalance == NaN) throw new HTTPException(422, "balance must be numeric");

		let updateBalance: BudgetManager|null = null;

		switch(operation) {
			case("add"):
				updateBalance = await this.budgetModel.findByIdAndUpdate(
					ID,
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
					ID,
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
					ID,
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


		if(!updateBalance) throw new HTTPException(409, "Budget manager does not exist");
		return updateBalance;
	}

	public async updateBudget(ID: string, budgetData: CreateBudgetDto): Promise<BudgetManager|never> {
		if (isEmpty(budgetData)) throw new HTTPException(400, "Budget data is empty");
		const updateBudget: BudgetManager|null = await this.budgetModel.findByIdAndUpdate(ID, {...budgetData}, {returnOriginal: false});
		if(!updateBudget) throw new HTTPException(409, "Budget manager does not exist");
		return updateBudget;
	}

	public async deleteBudget(ID: string): Promise<BudgetManager|never> {
		const deleteBudget: BudgetManager|null = await this.budgetModel.findByIdAndDelete(ID);
		if(!deleteBudget) throw new HTTPException(409, "Budget Manager does not exist");
		return deleteBudget;
	}

	public async deleteBill(BudgetID:string, BillID: string): Promise <BudgetManager|never> {
		if(isEmpty(BudgetID) || isEmpty(BillID)) throw new HTTPException (400,"incomplete path");
		const updateBudget: BudgetManager|null = await this.budgetModel.findByIdAndUpdate(
			BudgetID, 
			{
				$pull: { bills: { _id: BillID } },
			}, 
			{returnOriginal: false}
		);

		if(!updateBudget) throw new HTTPException(409, "Bill does not exist");

		return updateBudget;
	}
}

export default BudgetService;
