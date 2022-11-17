import { IsArray,  IsNumberString, IsString } from "class-validator";
import {Bill} from "../interfaces/bill";

export class LoginBudgetDto {
	@IsString()
	public _id: string;

	@IsNumberString()
	public _totalBalance: string;

	@IsArray()
	public bills: Array<Bill>;
};
