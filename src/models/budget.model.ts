import { model, Schema, Document } from 'mongoose';
import {BudgetManager} from '../interfaces/budget';

const budgetSchema: Schema = new Schema({
	_totalBalance: {
		type: Number,
	},
	bills: {
		type: Array, 
	},
});

const budgetModel = model<BudgetManager & Document>("budget", budgetSchema);
export default budgetModel;
