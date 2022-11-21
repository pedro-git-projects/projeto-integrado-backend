import { IsArray,  IsNumberString, IsString } from "class-validator";
import {Bill} from "../interfaces/bill.interface";

export class CreateBudgetDto {
	@IsNumberString()
	public totalBalance: string;

	@IsArray()
	public bills: Array<Bill>;

	@IsString()
	public createdBy: string;
};
