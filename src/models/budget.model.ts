import { model, Schema, Document } from 'mongoose';
import {BudgetManager} from '../interfaces/budget';
import {Bill} from "../interfaces/bill";
import {billSchema} from './bill.model';

const budgetSchema: Schema = new Schema({
	totalBalance: {
		type: Number,
	},
	bills: {
		type: [billSchema],
	}
}, {typeKey: "$type"}); 

budgetSchema.pre('updateOne', () => {
});

const budgetModel = model<BudgetManager & Bill &  Document>("budget", budgetSchema);
export default budgetModel;
