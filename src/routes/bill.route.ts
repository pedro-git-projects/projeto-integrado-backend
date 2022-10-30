import {Router} from "express";
import {Routes} from "../interfaces/routes.interface";
import BillController from "../controllers/bill.controller";

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
		this.router.get(`${this.path}/status/:status`, this.billsController.getBillByStatus);
		this.router.get(`${this.path}/frequency/:frequency`, this.billsController.getBillByFrequency);
		this.router.post(`${this.path}`, this.billsController.createBill);
		this.router.put(`${this.path}/:id`, this.billsController.updateBill);
		this.router.delete(`${this.path}/:id`, this.billsController.deleteBill);
	}
}

export default BillRoute;

