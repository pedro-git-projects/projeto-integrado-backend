import BudgetService from "../services/budget.service";
import { NextFunction, Request, Response } from "express";
import {BudgetManager} from "../interfaces/budget";
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
			const findBudgetData: BudgetManager[] = await this.budgetService.findBudget();
			console.log(req.cookies)
			res.status(200).json({ data: findBudgetData, message: "find many" });
		} catch(err){
			next(err);
		}
	}

	public getBudgetByID = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const ID: string =  req.params.id;
			const findBudgetData: BudgetManager = await this.budgetService.findBudgetByID(ID);
			res.status(200).json({data: findBudgetData, message: "find one"});
		} catch(err) {
			next(err);
		}
	}

		public getBillsByStatus = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetID: string = req.params.id;
			const _status: string = capitalizeFirst(req.params.status);
			const findBillData: BudgetManager|BudgetManager[] = await this.budgetService.findBillByStatus(budgetID, _status)
			res.status(200).json({data: findBillData, message: "by status"});
		} catch(err) {
			next(err);
		}
	}

	public getBillsByFrequency = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetID: string = req.params.id;
			const frequency: string = camelCaseFrequency(req.params.frequency);
			const findBillData: BudgetManager|BudgetManager[] = await this.budgetService.findBillByFrequency(budgetID, frequency)
			res.status(200).json({data: findBillData, message: "by frequency"});
		} catch(err) {
			next(err);
		}
	}

	public getBillsByTitle = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetID: string = req.params.id; 
			const title: string = req.params.title.toLowerCase(); 
			const findBillData: BudgetManager|BudgetManager[] = await this.budgetService.findBillByTitle(budgetID, title);
			res.status(200).json({data: findBillData, message: "by title"});
		} catch(err) {
			next(err);
		}	
	} 

	public createBudget = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const budgetData: CreateBudgetDto = req.body;
			const createBudgetData: BudgetManager = await this.budgetService.createBudget(budgetData);
			res.status(201).json({data: createBudgetData, message: "created"});
		} catch(err) {
			next(err);
		}
	} 

	public updateBudget = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const ID: string = req.params.id;
			const budgetData: CreateBudgetDto = req.body;
			const updateBudgetData: BudgetManager = await this.budgetService.updateBudget(ID, budgetData);
			res.status(200).json({data: updateBudgetData, message: "updated"});
		} catch(err) {
			next(err);
		}
	}

	public updateBalance = async(req: Request, res:Response, next: NextFunction) => {
		try {
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const auth = data.group; 
			console.log(auth);
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
			const payBillData: BudgetManager = await this.budgetService.payBill(budgetID, billID);
			res.status(200).json({data: payBillData, message: "paid"});
		} catch(err) {
			next(err);
		}
	}


	public deleteBudget = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const ID: string = req.params.id;
			const deleteBudgetData: BudgetManager = await this.budgetService.deleteBudget(ID);
			res.status(200).json({ data: deleteBudgetData, message: 'deleted' });
		} catch(err) {
			next(err);
		}
	}

	public deleteBill = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const BudgetID: string = req.params.budgetid;
			const BillID: string = req.params.billid;
			const removeBillData: BudgetManager = await this.budgetService.deleteBill(BudgetID, BillID)
			res.status(200).json({data: removeBillData, message:"removed bill"});
		} catch(err){
			next(err);
		}

	}

};

export default BudgetController;
