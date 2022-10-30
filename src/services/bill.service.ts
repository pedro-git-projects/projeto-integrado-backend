import { Bill } from "../interfaces/bill";
import { isEmpty } from "../utils/empty";
import { CreateBillDTO } from "../dto/bill.dto";
import {HTTPException} from "../exceptions/HTTPException";
import { billModel } from "../models/bill.model";
import {ObjectId, ReturnDocument} from "mongodb";

class BillService {
	public billModel = billModel;

	public async findBills(): Promise<Bill[]> {
		const bill: Bill[] = await this.billModel.find();
		return bill;
	}

	public async findBillByID(ID: string): Promise<Bill|never> {
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

	public async updateBill(ID: string, billData: CreateBillDTO): Promise<Bill|never> {
		if (isEmpty(billData)) throw new HTTPException(400, "No bill data");

		const updateBillByID: Bill|null = await this.billModel.findOneAndUpdate( {id_: ID}, {...billData}, {returnDocument: "after" });
		if(!updateBillByID) throw new HTTPException(404, "Bill not found");
		return updateBillByID;
	}

	public async deleteBill(ID: string): Promise<Bill|never> {
		if(isEmpty(ID)) throw new HTTPException(400, "ID is empty");

		const deleteBill: Bill|null = await this.billModel.findByIdAndDelete(ID)
		if(!deleteBill) throw new HTTPException(404, "Bill not found");
		return deleteBill;
	}
};

export default BillService;
