import { Bill } from "./bill.interface";

export interface BudgetManager {
	_id?: string,
	_totalBalance: number;
	bills: Bill[];
}
