import { NextFunction, Request, Response } from "express";
import {BudgetManager} from "../internals/budget";
import { BudgetService } from "../services/budget.service";

export class BudgetController {
	public budgetService = new BudgetService();

	public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void|never> => {
		try {
			const findAllData: BudgetManager = await this.budgetService.findAll();
			res.status(200).send(findAllData.toJSON());
		} catch(err) {
			next(err)
		}
	};

}
