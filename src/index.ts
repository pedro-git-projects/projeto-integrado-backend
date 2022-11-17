import { App } from "./app";
import BillRoute from "./routes/bill.route";
import BudgetRoute from "./routes/budget.route";
import AuthRoute from "./routes/auth.route";

const app = new App([new BillRoute(), new BudgetRoute(), new AuthRoute()]);
app.listen(); 
