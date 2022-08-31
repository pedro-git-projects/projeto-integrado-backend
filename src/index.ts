import { App } from "./app";
import { BudgetRoute } from "./routes/budget.route";

const app = new App([new BudgetRoute()]);
app.listen();
