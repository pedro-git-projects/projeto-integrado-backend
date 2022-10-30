import { model, Schema, Document } from 'mongoose';
import {BudgetManager} from '../interfaces/budget';
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
