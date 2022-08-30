import {BudgetManager} from "../internals/budget"
import { Budget } from "../internals/budget"

const budgetModelStr: string = `{"totalBalance":"1500","bills":[{"id":"l7ghkrl53temg0c84a4","title":"BJJ","cost":"190","frequency":"Recurring","status":"Paid","due":"2-11-2019"},{"id":"l7ghkrl5akl9xk7aana","title":"IESB","cost":"400","frequency":"Recurring","status":"Pending","due":"2-11-2021"},{"id":"l7ghkrl5bb2smxvy6ks","title":"Gym","cost":"80","frequency":"Recurring","status":"Paid","due":"2-11-2019"},{"id":"l7ghkrl5biuouynhlkj","title":"Watermelon","cost":"20","frequency":"OneTime","status":"Pending","due":"2-11-2019"}]}`

export const BudgetModel: BudgetManager = Budget.JSONParse(budgetModelStr); 
