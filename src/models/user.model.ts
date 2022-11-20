import {model, Document, Schema} from "mongoose";
import { User } from "../interfaces/user.interface";

const userSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		require: true
	},
	group: {
		type: String,
		enum: ["root", "users"],
		require: true
	}
});

const userModel = model<User & Document>("user", userSchema);
export default userModel;
