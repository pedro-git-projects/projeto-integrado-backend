import {BudgetManager} from "../internals/budget";
import { BudgetModel } from "../models/budget.model";
import { HTTPException} from "../exceptions/HTTPException";
import { Bill } from "../internals/bill";
import { JSONBill } from "../internals/bill";
import { valueStr } from "../internals/budget";

export class BudgetService {
	public budget = BudgetModel;

	public async findAll(): Promise<BudgetManager> {
		const budget: BudgetManager = this.budget;
		return budget;
	}

	public async findAllBills(): Promise<Bill[]> {
		const budget: BudgetManager = this.budget;
		const bills = budget.getAllBills();
		return bills; }

	public async findBillByID(id:string): Promise<Bill|never > {
		const budget: BudgetManager = this.budget;
		const byID = budget.getBillByID(id);
		if(byID === undefined) throw new HTTPException(404, "Bill not found"); 
		return byID;
	}

	public async findBillsByPaid(): Promise<Bill[]|never> {
		const budget: BudgetManager = this.budget;
		const paid: Bill[] = budget.getBillsByPaid();
		if(paid.length === 0) throw new HTTPException(404, "No paid bills");
		return paid;
	} 

	public async findBillsByPending(): Promise<Bill[]|never>{
		const budget: BudgetManager = this.budget;
		const pending: Bill[] = budget.getBillsByPending();
		if(pending.length === 0) throw new HTTPException(404, "No pending bills");
		return pending;

	}

	public async findBillsByOverdue(): Promise<Bill[]|never> {
		const budget: BudgetManager = this.budget;
		const overdue: Bill[] = budget.getBillsByOverdue();
		if(overdue.length === 0) throw new HTTPException(404, "No overdue bills");
		return overdue;
	} 

	public async findTotalBalance(): Promise<BigInt|never> {
		const budget: BudgetManager = this.budget; 
		const balance = budget.totalBalance;
		return balance;
	}

	public async createBill(json:string): Promise<Bill|never> {
		const b = json as unknown as JSONBill; 
		const bill = Bill.ParseJSONStr(b);
		if(bill === undefined || bill === null) {
			throw new HTTPException(422, "Unprocessable entity");
		}
		this.budget.addBill(bill);
		return bill;		
	} 

	public async deleteBill(id:string): Promise<Bill|never> {
		const budget: BudgetManager = this.budget;
		const byID = budget.getBillByID(id);
		if(byID === undefined) { 
			throw new HTTPException(404, "Bill not found");
		} else {
			budget.removeBill(byID);
			return byID;
		} 
	}

	public async addMoney(value: string): Promise<BudgetManager|never> {
		const budget = this.budget;
		const v = value as unknown as valueStr; 
		const numeric: bigint = BigInt(v.value);	
		if(numeric === null || numeric === undefined) {
			throw new HTTPException(422, "Unprocessable entity")
		}
		budget.addMoney(numeric);
		return budget;
	}
};
