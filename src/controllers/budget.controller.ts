import BudgetService from "../services/budget.service";
import { NextFunction, Request, Response } from "express";
import {BudgetManager} from "../interfaces/budget";
import {CreateBudgetDto} from "../dto/budget.dto";

class BudgetController {
	public budgetService = new BudgetService();

	public getBudget = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const findBudgetData: BudgetManager[] = await this.budgetService.findBudget();
      		res.status(200).json({ data: findBudgetData, message: "findBudget" });
		} catch(err){
			next(err);
		}
	};

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

	public deleteBudget = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const ID: string = req.params.id;
			const deleteBudgetData: BudgetManager = await this.budgetService.deleteBudget(ID);
      res.status(200).json({ data: deleteBudgetData, message: 'deleted' });
		} catch(err) {
			next(err);
		}
	}

};

export default BudgetController;
