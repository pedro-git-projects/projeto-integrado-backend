import { Request } from "express";
import { User } from "../interfaces/user.interface";
import { Group } from "./group.enum";

export interface DataStoredInToken {
	_id: string;
	group: Group;
}

export interface TokenData {
	token: string;
	expiresIn: number;
}

export interface RequestWithUser extends Request {
	user: User
}
