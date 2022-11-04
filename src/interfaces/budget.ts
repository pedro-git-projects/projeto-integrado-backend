import { Bill } from "./bill";

export interface BudgetManager {
	_id?: string,
	totalBalance: number;
	bills: Bill[];
}
