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
		this.router.get(`${this.path}/balance`, this.budgetController.getTotalBalance);
		this.router.post(`${this.path}/bill/create`, this.budgetController.createBill);
		this.router.get(`${this.path}/bill/:id`, this.budgetController.getBillByID);
		this.router.get(`${this.path}/bills/`, this.budgetController.getAllBills);
		this.router.get(`${this.path}/bills/paid`, this.budgetController.getBillsByPaid);
		this.router.get(`${this.path}/bills/pending`, this.budgetController.getBillsByPending);
		this.router.get(`${this.path}/bills/overdue`, this.budgetController.getBillsByOverdue);
	}
};
