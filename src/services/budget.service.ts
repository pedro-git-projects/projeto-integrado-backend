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

	public async updateBalance(ID: string, operation: string, balance: string): Promise<BudgetManager|never> {
		if(isEmpty(ID) || isEmpty(balance) || isEmpty(operation)) throw new HTTPException(400, "incomplete path");

		const nBalance = Number(balance);
		if(nBalance == NaN) throw new HTTPException(422, "balance must be numeric");

		let updateBalance: BudgetManager|null = null;

		switch(operation) {
			case("add"):
				updateBalance = await this.budgetModel.findByIdAndUpdate(
					ID,
					{
						$inc: {"totalBalance": nBalance}
					},
					{
						returnOriginal: false
					}
			);
			break;

			case("sub"):
				updateBalance = await this.budgetModel.findByIdAndUpdate(
					ID,
					{
						$inc : {"totalBalance": -nBalance}
					},
					{
						returnOriginal: false
					}
			);		
			break;

			case("set"):
				updateBalance = await this.budgetModel.findByIdAndUpdate(
					ID,
					{
						$set : {"totalBalance": nBalance}
					},
					{
						returnOriginal: false
					}
			);
			break;

			default:
				throw new HTTPException(422, `invalid parameter ${operation}`);
		}


		if(!updateBalance) throw new HTTPException(409, "Budget manager does not exist");
		return updateBalance;
	}

	public async updateBudget(ID: string, budgetData: CreateBudgetDto): Promise<BudgetManager|never> {
		if (isEmpty(budgetData)) throw new HTTPException(400, "Budget data is empty");
		const updateBudget: BudgetManager|null = await this.budgetModel.findByIdAndUpdate(ID, {...budgetData}, {returnOriginal: false});
		if(!updateBudget) throw new HTTPException(409, "Budget manager does not exist");
		return updateBudget;
	}

	public async deleteBudget(ID: string): Promise<BudgetManager|never> {
		const deleteBudget: BudgetManager|null = await this.budgetModel.findByIdAndDelete(ID);
		if(!deleteBudget) throw new HTTPException(409, "Budget Manager does not exist");
		return deleteBudget;
	}

}

export default BudgetService;
