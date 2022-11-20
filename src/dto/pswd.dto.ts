import {IsString} from "class-validator";

export class ChangePswdDTO {
	@IsString()
	oldPassword: string;

	@IsString()
	newPassword: string;
}
