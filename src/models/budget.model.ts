import { model, Schema, Document } from 'mongoose';
import {BudgetManager} from '../interfaces/budget.interface';
import {billSchema} from './bill.model';

const budgetSchema: Schema = new Schema({
	totalBalance: {
		type: Number,
	},
	bills: {
		type: [billSchema],
	}
});

const budgetModel = model<BudgetManager & Document>("budget", budgetSchema);
export default budgetModel;
