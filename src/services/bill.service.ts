import { Bill } from "../interfaces/bill";
import { isEmpty } from "../utils/empty";
import { CreateBillDTO } from "../dto/bill.dto";
import {HTTPException} from "../exceptions/HTTPException";
import billModel from "../models/bill.model";

class BillService {
	public billModel = billModel;

	public async findBills(): Promise<Bill[]> {
		const bill: Bill[] = await this.billModel.find();
		return bill;
	}

	public async findBillByID(ID: string): Promise<Bill> {
		if (isEmpty(ID)) throw new HTTPException(400, "ID is empty");

		const findBill: Bill|null = await this.billModel.findOne({ _id: ID});
		if (!findBill) throw new HTTPException(409, "Bill doesn't exist");

		return findBill;
	}

	public async createBill(billData: CreateBillDTO): Promise<Bill> {
		if (isEmpty(billData)) throw new HTTPException(400, "No bill data");
		
		const createBillData: Bill = await this.billModel.create({...billData});
		return createBillData;
	}


};



export default BillService;
