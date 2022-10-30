import { App } from "./app";
import BillRoute from "./routes/bill.route";
import { BudgetRoute } from "./routes/budget.route";

const app = new App([new BillRoute(), new BudgetRoute()]);
app.listen(); 
