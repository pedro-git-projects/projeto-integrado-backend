import  request  from "supertest";
import { App } from "../app";
import { BudgetManager } from "../interfaces/budget";
import { BudgetModel } from "../models/budget.model";
import {BudgetRoute} from "../routes/budget.route";
import { Bill } from "../internals/bill";
import { Budget } from "../internals/budget";
import {CreateBillDTO} from "../dto/bill.dto";

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
	describe('[GET] /budget/bills', () => {
		it('response statusCode 200/ findAllBills', () => {
			const findAllBills: Bill[] = BudgetModel.getAllBills(); 
			const budgetRoute = new BudgetRoute();
			const app = new App([budgetRoute]);

			return request(app.getServer()).
				get(`${budgetRoute.path}/bills`).expect(200, Budget.billsToJSON(findAllBills));
		});
	});

	describe('[GET] /budget/bills/paid', () => {
		it('response statusCode 200/ findPaidBills', () => {
			const findPaidBills: Bill[] = BudgetModel.getBillsByPaid(); 
			const budgetRoute = new BudgetRoute();
			const app = new App([budgetRoute]);

			return request(app.getServer()).
				get(`${budgetRoute.path}/bills/paid`).expect(200, Budget.billsToJSON(findPaidBills));
		});
	});

	describe('[GET] /budget/bills/pending', () => {
		it('response statusCode 200/ findPendingBills', () => {
			const findPendingBills: Bill[] = BudgetModel.getBillsByPending(); 
			const budgetRoute = new BudgetRoute();
			const app = new App([budgetRoute]);

			return request(app.getServer()).
				get(`${budgetRoute.path}/bills/pending`).expect(200, Budget.billsToJSON(findPendingBills));
		});
	});

	describe('[GET] /budget/bills/overdue', () => {
		it('response statusCode 200/ findOverdueBills', () => {
			const findOverdueBills: Bill[] = BudgetModel.getBillsByOverdue(); 
			const budgetRoute = new BudgetRoute();
			const app = new App([budgetRoute]);

			return request(app.getServer()).
				get(`${budgetRoute.path}/bills/overdue`).expect(200, Budget.billsToJSON(findOverdueBills));
		});
	});

	describe('[GET] /budget/balance', () => {
		it('response statusCode 200/ findBalance', () => {
			const findBalance: BigInt = BudgetModel.totalBalance; 
			const findBalanceStr = findBalance.toString()
			const budgetRoute = new BudgetRoute();
			const app = new App([budgetRoute]);

			return request(app.getServer()).
				get(`${budgetRoute.path}/balance`).expect(200, {totalBalance: findBalanceStr});
		});
	});

	describe('[POST] /budget/bill/create', () => {
		it('response statusCode 201 / created', async () => {
			const billData: CreateBillDTO = {
				title: "Nova", 
				cost: "50",
				frequency: "OneTime",
				status: "Paid",
				due: "10-10-2020",
			};

			const budgetRoute = new BudgetRoute();
			const app = new App([budgetRoute]);
			return request(app.getServer()).post(`${budgetRoute.path}/bill/create`).send(billData).expect(201);
		});
	});

 describe('[PUT] /budget/bill/pay/:id', () => {
    it('response statusCode 200 / updated', async () => {
		const id = "l7ghkrl5akl9xk7aana";
		const budgetRoute = new BudgetRoute();
		const app = new App([budgetRoute]);
		const afterBill = BudgetModel.toJSON();
		return request(app.getServer()).put(`${budgetRoute.path}/bill/pay/${id}`).send(afterBill).expect(200);
    });
  });

describe('[DELETE] /budget/delete/:id', () => {
		it('response statusCode 200 / deleted', async () => {
			const id = "l7ghkrl53temg0c84a4";
			const billToDelete = BudgetModel.getBillByID(id)!;
			const budgetRoute = new BudgetRoute();
			const app = new App([budgetRoute]);
			return request(app.getServer()).delete(`${budgetRoute.path}/bill/delete/${id}`).send(billToDelete.toJSON()).expect(200);
		});
	});
 });
