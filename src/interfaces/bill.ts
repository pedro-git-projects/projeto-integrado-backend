import { Frequency } from "./frequency.enum";
import { Status } from "./status.enum";

export interface Bill {
	_id?: string;
	title: string;
	cost: number;
	frequency: Frequency;
	status: Status;
	due: Date;
}
