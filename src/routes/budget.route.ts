import { Router } from "express";
import { BudgetController } from "../controllers/budget.controller";
import { Routes } from "../internals/routes.interface";

export class BudgetRoute implements Routes {
	public path = '/budget';
	public router = Router();
	public budgetController = new BudgetController;

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.budgetController.getAll);
	}
};
