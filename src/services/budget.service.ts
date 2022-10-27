import { BudgetManager } from "../interfaces/budget";
import { HTTPException } from "../exceptions/HTTPException";
import { isEmpty } from "../utils/empty";
import budgetModel from "../models/budget.model";
import {CreateBudgetDto} from "../dto/budget.dto";

class BudgetService {
	public budgetModel = budgetModel;

	public async findBudget(): Promise<BudgetManager[]> {
		const budget: BudgetManager[] = await this.budgetModel.find();
		return budget;
	} 

	public async findBudgetByID(ID: string): Promise<BudgetManager|never> {
		if (isEmpty(ID)) throw new HTTPException(400, "ID is empty");
		const findBudget: BudgetManager|null = await this.budgetModel.findOne({_id: ID}); 
		if(!findBudget) throw new HTTPException(409, "Bill does't exist");
		return findBudget;
	}

	public async createBudget(budgetData: CreateBudgetDto): Promise<BudgetManager> {
		if(isEmpty(budgetData)) throw new HTTPException(400, "Budget data is empty");
		const createBudgetData: BudgetManager = await this.budgetModel.create({...budgetData});
		return createBudgetData;
	}

	 public async deleteBudget(ID: string): Promise<BudgetManager|never> {
		 const deleteBudget: BudgetManager|null = await this.budgetModel.findByIdAndDelete(ID);
		 if(!deleteBudget) throw new HTTPException(409, "Budget Manager does not exist");
		 return deleteBudget;
	 }

}

export default BudgetService;
