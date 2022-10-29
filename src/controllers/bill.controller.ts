import BillService from "../services/bill.service";
import { NextFunction, Request, Response } from "express";
import {Bill} from "../interfaces/bill";
import { CreateBillDTO } from "../dto/bill.dto";

class BillController {
	public billService = new BillService();

	public getBills = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const findBillData: Bill[] = await this.billService.findBills();
			res.status(200).json({ data: findBillData, message: "findAllBills" });
		} catch(err){
			next(err);
		}
	};

	public getBillById = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const ID: string = req.params.id;
			const findOneBillData: Bill = await this.billService.findBillByID(ID);
			res.status(200).json({ data: findOneBillData, message: 'findOne' });
		} catch (error) {
			next(error);
		}
	};

	public createBill = async(req: Request, res: Response, next: NextFunction) =>  {
		try {
			const billData: CreateBillDTO = req.body;
			const createBillData: Bill = await this.billService.createBill(billData);
			res.status(201).json({data: createBillData, message: "created"});
		} catch(err) {
			next(err);
		}
	};

	public updateBill = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const ID: string = req.params.id;
			const billData: CreateBillDTO = req.body;
			console.log(req.body) // <- delete afeter fix
			const updateBillData: Bill = await this.billService.updateBill(ID, billData);
			console.log(updateBillData) // <- delete after fix
			res.status(200).json({data: updateBillData, message: "updated"});
			
		} catch (err) {
			next(err);	
		}
	};

	public deleteBill = async(req: Request, res: Response, next: NextFunction) =>  {
		try {
			const ID: string = req.params.id;
			const deletedBillData: Bill = await this.billService.deleteBill(ID);
			res.status(200).json({data: deletedBillData, message:"deleted"});
		} catch(err) {
			next(err);
		}
	};

};



export default BillController;