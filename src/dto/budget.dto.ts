import { IsArray,  IsNumberString } from "class-validator";
import {Bill} from "../interfaces/bill";

export class CreateBudgetDto {
	@IsNumberString()
	public _totalBalance: string;

	@IsArray()
	public bills: Array<Bill>;
};
