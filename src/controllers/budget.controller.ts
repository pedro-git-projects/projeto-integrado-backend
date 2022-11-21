import BudgetService from "../services/budget.service";
import { NextFunction, Request, Response } from "express";
import {BudgetManager} from "../interfaces/budget.interface";
import {CreateBudgetDto} from "../dto/budget.dto";
import {capitalizeFirst} from "../utils/capitalize";
import {camelCaseFrequency} from "../interfaces/frequency.enum";
import {verify} from "jsonwebtoken";
import {SECRET_KEY} from "../config/config";
import {DataStoredInToken} from "../interfaces/auth.interface"

class BudgetController {
	public budgetService = new BudgetService();

	public getBudget = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const userID = data._id; 
			const privilegeLevel = data.group; 
			const findBudgetData: BudgetManager[] = await this.budgetService.findBudget(userID, privilegeLevel);
			res.status(200).json({ data: findBudgetData, message: "find many" });
		} catch(err){
			next(err);
		}
	}

	public getBudgetByID = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetID: string =  req.params.id;
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const userID = data._id; 
			const privilegeLevel = data.group;
			const findBudgetData: BudgetManager = await this.budgetService.findBudgetByID(budgetID, privilegeLevel, userID);
			res.status(200).json({data: findBudgetData, message: "find one"});
		} catch(err) {
			next(err);
		}
	}

		public getBillsByStatus = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetID: string = req.params.id;
			const _status: string = capitalizeFirst(req.params.status);
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const userID = data._id; 
			const group = data.group;
			const findBillData: BudgetManager|BudgetManager[] = await this.budgetService.findBillByStatus(budgetID, _status, group, userID);
			res.status(200).json({data: findBillData, message: "by status"});
		} catch(err) {
			next(err);
		}
	}

	public getBillsByFrequency = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetID: string = req.params.id;
			const frequency: string = camelCaseFrequency(req.params.frequency);
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const userID = data._id; 
			const group = data.group;
			const findBillData: BudgetManager|BudgetManager[] = await this.budgetService.findBillByFrequency(budgetID, frequency, group, userID);
			res.status(200).json({data: findBillData, message: "by frequency"});
		} catch(err) {
			next(err);
		}
	}

	public getBillsByTitle = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetID: string = req.params.id; 
			const title: string = req.params.title.toLowerCase(); 
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const userID = data._id; 
			const group = data.group;
			const findBillData: BudgetManager|BudgetManager[] = await this.budgetService.findBillByTitle(budgetID, title, group, userID);
			res.status(200).json({data: findBillData, message: "by title"});
		} catch(err) {
			next(err);
		}	
	} 

	public createBudget = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetData: CreateBudgetDto = new CreateBudgetDto();
			budgetData.totalBalance = req.body.totalBalance;
			budgetData.bills = req.body.bills;
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			budgetData.createdBy = data._id; 

			const userID = data._id; 
			const group = data.group;
			const createBudgetData: BudgetManager = await this.budgetService.createBudget(budgetData, group, userID);
			res.status(201).json({data: createBudgetData, message: "created"});
		} catch(err) {
			next(err);
		}
	} 

	public updateBudget = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const ID: string = req.params.id;
			const budgetData: CreateBudgetDto = req.body;
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const group = data.group;
			const updateBudgetData: BudgetManager = await this.budgetService.updateBudget(ID, budgetData, group);
			res.status(200).json({data: updateBudgetData, message: "updated"});
		} catch(err) {
			next(err);
		}
	}

	public updateBalance = async(req: Request, res:Response, next: NextFunction) => {
		try {
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const auth = data.group; 
			const ID: string = req.params.id;
			const operation: string = req.params.operation;
			const balance: string = req.params.balance;
			const balanceBudgetData: BudgetManager = await this.budgetService.updateBalance(ID, operation, balance, auth);
			res.status(200).json({data: balanceBudgetData, message:"added"});
		} catch(err) {
			next(err);
		}
	}

	public payBill = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetID: string = req.params.budgetid;
			const billID: string = req.params.billid;
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const group = data.group;
			const userID = data._id;
			const payBillData: BudgetManager = await this.budgetService.payBill(budgetID, billID, group, userID);
			res.status(200).json({data: payBillData, message: "paid"});
		} catch(err) {
			next(err);
		}
	}


	public deleteBudget = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const ID: string = req.params.id;
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const group = data.group;
			const userID = data._id;
			const deleteBudgetData: BudgetManager = await this.budgetService.deleteBudget(ID, group, userID);
			res.status(200).json({ data: deleteBudgetData, message: 'deleted' });
		} catch(err) {
			next(err);
		}
	}

	public createBill = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetID  = req.params.id;
			const billData = req.body;
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const group = data.group;
			const userID = data._id;
			const addedBillData: BudgetManager = await this.budgetService.createBill(budgetID, billData, group, userID)
			res.status(200).json({data: addedBillData, message: "added"});
		} catch (err) {
			next(err);	
		}
	}

	public deleteBill = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const BudgetID: string = req.params.budgetid;
			const BillID: string = req.params.billid;
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const group = data.group;
			const userID = data._id;
			const removeBillData: BudgetManager = await this.budgetService.deleteBill(BudgetID, BillID, group, userID)
			res.status(200).json({data: removeBillData, message:"removed bill"});
		} catch(err){
			next(err);
		}

	}

};

export default BudgetController;
