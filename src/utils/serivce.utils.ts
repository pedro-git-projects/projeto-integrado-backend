import budgetModel from "../models/budget.model";
import { HTTPException } from "../exceptions/HTTPException";

const budgets = budgetModel;

export const getBudgetID = async (userID: string) => {
  const budgetManager = await budgets.findOne({createdBy: userID});
  if(!budgetManager) throw new HTTPException(404, "not found");
  const id = budgetManager._id;
  return id;
}
