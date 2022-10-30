import { Bill } from "./bill";

export interface BudgetManager {
	_id?: string,
	_totalBalance: number;
	bills: Bill[];
}
