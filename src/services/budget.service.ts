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

	public async findBillByID(id:string): Promise<Bill | never > {
		const budget: BudgetManager = this.budget;
		const byID = budget.getBillByID(id);
		if(byID === undefined) throw new HTTPException(409, "Bill does not exist"); 
		return byID;
	}
};
