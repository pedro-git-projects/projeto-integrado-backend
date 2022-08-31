import { NextFunction, Request, Response } from "express";
import { Budget } from "../internals/budget";
import {BudgetManager} from "../internals/budget";
import { BudgetService } from "../services/budget.service";
import { Bill } from "../internals/bill";

export class BudgetController {
	public budgetService = new BudgetService();

	public getAll = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const findAllData: BudgetManager = await this.budgetService.findAll();
			res.status(200)
			.type('application/json')
			.send(findAllData.toJSON());
		} catch(err) {
			next(err);
		}
	};

	public getAllBills = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const getBills: Bill[] = await this.budgetService.findAllBills();
			res.status(200)
			.type('application/json')
			.send(Budget.billsToJSON(getBills));
		} catch(err){
			next(err);
		}
	};

	public getBillByID = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const billById: Bill = await this.budgetService.findBillByID(req.params.id);
			res.status(200)
			.type('application/json')
			.send(billById.toJSON());
		} catch(err){
			next(err);
		}
	};

	public getBillsByPaid = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const byPaid: Bill[] = await this.budgetService.findBillsByPaid();
			res.status(200)
			.type('application/json')
			.send(Budget.billsToJSON(byPaid));
		} catch(err){
			next(err);
		}
	};

	public getBillsByPending = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const pending: Bill[] = await this.budgetService.findBillsByPending();
			res.status(200)
			.type('application/json')
			.send(Budget.billsToJSON(pending));
		} catch(err){
			next(err);
		}
	};

	public getBillsByOverdue = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const overdue: Bill[] = await this.budgetService.findBillsByOverdue();
			res.status(200)
			.type('application/json')
			.send(Budget.billsToJSON(overdue));
		} catch(err){
			next(err);
		}
	};

	public getTotalBalance = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const balance: BigInt = await this.budgetService.findTotalBalance();
			const balanceStr = String(balance);
			res.status(200).json({totalBalance: balanceStr});
		} catch(err) {
			next(err);
		}
	};

	public createBill = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try{
			const newBill: Bill = await this.budgetService.createBill(req.body);
			res
			.status(201)
			.type('application/json')
			.send(newBill.toJSON())
		} catch(err) {
			next(err)
		}
	};


	public removeBill = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const deleted = await this.budgetService.deleteBill(req.params.id);
			res
			.status(200)
			.type('application/json')
			.send(deleted.toJSON());
		} catch(err) {
			next(err);
		}
	}

	public addMoney  = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const account = await this.budgetService.addMoney(req.body);	
			res
			.status(200)
			.type('application/json')
			.send(account.toJSON());
		} catch(err){
			next(err);
		}
	}

	public removeMoney = async(req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const account = await this.budgetService.removeMoney(req.body);	
			res
			.status(200)
			.type('application/json')
			.send(account.toJSON());
		} catch(err){
			next(err);
		}
	}

	public payBillByID = async (req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const paid = await this.budgetService.payBill(req.params.id); 
			res
			.status(200)
			.type('application/json')
			.send(paid.toJSON());
		} catch(err) {
			next(err);
		}
	}

};
