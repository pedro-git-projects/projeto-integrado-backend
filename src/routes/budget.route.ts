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
		this.router.get(`${this.path}/:id/status/:status`, this.budgetController.getBillsByStatus);
		this.router.get(`${this.path}/:id/frequency/:frequency`, this.budgetController.getBillsByFrequency);
		this.router.get(`${this.path}/:id/title/:title`, this.budgetController.getBillsByTitle);
		this.router.post(`${this.path}`, this.budgetController.createBudget);
		this.router.put(`${this.path}/:id`, this.budgetController.updateBudget);
		this.router.put(`${this.path}/:budgetid/pay/:billid`, this.budgetController.payBill);
		this.router.put(`${this.path}/:id/:operation/:balance`, this.budgetController.updateBalance);
		this.router.delete(`${this.path}/:budgetid/:billid`, this.budgetController.deleteBill);
		this.router.delete(`${this.path}/:id`, this.budgetController.deleteBudget);
	}
};

export default BudgetRoute;
