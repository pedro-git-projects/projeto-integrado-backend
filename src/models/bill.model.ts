import { model, Schema, Document } from 'mongoose';
import { Bill } from "../interfaces/bill";

export const billSchema: Schema = new Schema({
	title: {
		type: String,
		required: true,
	},
	cost: {
		type: Number,
		required: true,
	},
	frequency: {
		type: String,  
		enum:["Recurring", "OneTime"], 
		required: true,
	},
	status: {
		type: String,
		enum:["Paid", "Pending", "Overdue"],
		required: true,
	},
	due: {
		type: Date,
		required: true,
	},
});

export const billModel = model<Bill & Document>("bill", billSchema);
//export billModel;
