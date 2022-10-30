import mongoose from "mongoose";
import request from "supertest";
import { App } from "../app";
import BudgetRoute from "../routes/budget.route";

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(
    () => resolve(), 500
  ));
});


describe('Testing BudgetManager', () => {
  describe('[GET] /budget', () => {
    it('response find Budget managers', async () => {
      const budgetRoute = new BudgetRoute();
      const budget = budgetRoute.budgetController.budgetService.budgetModel;

      budget.find = jest.fn().mockReturnValue([
        {
          "_id": "635b0d32f1c71632a5570e13",
          "totalBalance": 2500,
          "bills": [
            {
              "title": "UPDATED",
              "cost": 190,
              "frequency": "Recurring",
              "status": "Pending",
              "due": "2019-02-11T02:00:00.000Z",
              "_id": "635b28858a76236a40dbf8b9"
            },
            {
              "title": "IESB",
              "cost": 400,
              "frequency": "Recurring",
              "status": "Pending",
              "due": "2021-02-11T03:00:00.000Z",
              "_id": "635b28858a76236a40dbf8ba"
            },
            {
              "title": "Gym",
              "cost": 80,
              "frequency": "Recurring",
              "status": "Paid",
              "due": "2019-02-11T02:00:00.000Z",
              "_id": "635b28858a76236a40dbf8bb"
            },
            {
              "title": "Watermelon",
              "cost": 20,
              "frequency": "OneTime",
              "status": "Pending",
              "due": "2019-02-11T02:00:00.000Z",
              "_id": "635b28858a76236a40dbf8bc"
            }
          ],
        }
      ]);
     
     (mongoose as any).connect = jest.fn();
    const app = new App([budgetRoute]);
    return request(app.getServer()).get(`${budgetRoute.path}`).expect(200);
    });
  })
});
