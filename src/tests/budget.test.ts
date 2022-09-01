import  request  from "supertest";
import { App } from "../app";
import { BudgetManager } from "../internals/budget";
import { BudgetModel } from "../models/budget.model";
import {BudgetRoute} from "../routes/budget.route";
import { Bill } from "../internals/bill";

afterAll(async () => {
	await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing BudgetModel', () => {
	describe('[GET] /budget', () => {
		it('response statusCode 200 / findAll', () => {

			const findBudget: BudgetManager = BudgetModel;
			const budgetRoute = new BudgetRoute(); 
			const app = new App([budgetRoute]);

			return request(app.getServer())
			.get(`${budgetRoute.path}`)
			.expect(200, findBudget.toJSON());
		});
	});
	describe('[GET] /budget/bill/:id', () => {
		it('response statusCode 200/ findOne', () => {
			const ID = "l7ghkrl53temg0c84a4";
			const findBill: Bill = BudgetModel.getBillByID(ID)!; 
			const budgetRoute = new BudgetRoute();
			const app = new App([budgetRoute]);

			return request(app.getServer()).
				get(`${budgetRoute.path}/bill/${ID}`).expect(200, findBill.toJSON())
		});
	});
});


