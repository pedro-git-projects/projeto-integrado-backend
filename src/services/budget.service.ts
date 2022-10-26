import { BudgetManager } from "../interfaces/budget";
import budgetModel from "../models/budget.model";

class BudgetService {
	public budgetModel = budgetModel;

	public async findBudget(): Promise<BudgetManager[]> {
		const budget: BudgetManager[] = await this.budgetModel.find();
		return budget;
	}
}

export default BudgetService;
