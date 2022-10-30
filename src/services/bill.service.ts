import { Bill } from "../interfaces/bill";
import { isEmpty } from "../utils/empty";
import { CreateBillDTO } from "../dto/bill.dto";
import {HTTPException} from "../exceptions/HTTPException";
import { billModel } from "../models/bill.model";
import {capitalizeFirst, decapitalizeFirst} from "../utils/capitalize";
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

	public async findBillByStatus(status: string): Promise<Bill|Bill[]|never> {
		if(isEmpty(status)) throw new HTTPException(400, "status is empty");

		status = capitalizeFirst(status);
		if(status !== "Paid" && status !== "Pending" && status !== "Overdue") throw new HTTPException(422, "invalid status");
		
		const findBill: Bill|Bill[]|null = await this.billModel.find({status: status});

		status = decapitalizeFirst(status);
		if(!findBill) throw new HTTPException(409, `no ${status} bills`);
		return findBill;
	}

	public async findBillByFrequency(frequency: string): Promise<Bill|Bill[]|never> {
		if(isEmpty(frequency)) throw new HTTPException(400, "frequency is empty");

		switch(frequency) {
			case("onetime"):
				frequency = "OneTime";
				break;
			case("recurring"):
				frequency = capitalizeFirst(frequency);
				break;
			default:
				throw new HTTPException(422, "invalid frequency");
		}

		const findBill: Bill|Bill[]|null = await this.billModel.find({frequency: frequency});
		if(!findBill) throw new HTTPException(409, "not found");
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
