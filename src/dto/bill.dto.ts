import { IsDate, IsEnum, IsNumberString, IsString } from "class-validator";
import {Frequency} from "../interfaces/frequency.enum";
import {Status} from "../interfaces/status.enum";

export class CreateBillDTO {
	@IsString()
	public title: string;

	@IsNumberString()
	public cost: string;

	@IsEnum(Frequency)
	public frequency: string;

	@IsEnum(Status)
	public status: string;

	@IsDate()
	public due: string;
};
