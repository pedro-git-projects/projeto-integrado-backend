import { Group } from "./group.enum"

export interface User {
	_id: string,
	email: string,
	password: string,
	group: Group,
};
