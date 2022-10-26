import { Bill } from "./bill";

export interface BudgetManager {
	_totalBalance: number;
	bills: Bill[];
}
