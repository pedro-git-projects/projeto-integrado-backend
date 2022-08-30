import {BudgetManager} from "../internals/budget";
import { BudgetModel } from "../models/budget.model";
import { HTTPException} from "../exceptions/HTTPException";
import { Bill } from "../internals/bill";

export class BudgetService {
	public budget = BudgetModel;

	public async findAll(): Promise<BudgetManager> {
		const budget: BudgetManager = this.budget;
		return budget;
	}

	public async findAllBills(): Promise<Bill[]> {
		const budget: BudgetManager = this.budget;
		const bills = budget.getAllBills();
		return bills;
	}

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
		console.log(`${overdue.toString()}`)
		if(overdue.length === 0) throw new HTTPException(404, "No overdue bills");
		return overdue;
	} 
};
