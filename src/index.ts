import { App } from "./app";
import BudgetRoute from "./routes/budget.route";
import AuthRoute from "./routes/auth.route";
import UserRoute from "./routes/user.route";

const app = new App([new BudgetRoute(), new AuthRoute(), new UserRoute()]);
app.listen(); 
