import { Router } from "express";
import  BudgetController  from "../controllers/budget.controller";
import { Routes } from "../interfaces/routes.interface";

export class BudgetRoute implements Routes {
	public path = '/budget';
	public router = Router();
	public budgetController = new BudgetController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.budgetController.getBudget);
		this.router.post(`${this.path}`, this.budgetController.createBudget);
	}
};

export default BudgetRoute;
