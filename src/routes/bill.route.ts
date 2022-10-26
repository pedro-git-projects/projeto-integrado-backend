import {Router} from "express";
import BillController from "../controllers/bill.controller";
import {Routes} from "../interfaces/routes.interface";

class BillRoute implements Routes {
	public path = '/bill';
	public router = Router();
	public billsController = new BillController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.billsController.getBills);
		this.router.get(`${this.path}/:id`, this.billsController.getBillById);
		this.router.post(`${this.path}`, this.billsController.createBill);
	}
}

export default BillRoute;

