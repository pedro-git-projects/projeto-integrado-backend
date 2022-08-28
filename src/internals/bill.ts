import { Frequency } from "./frequency.enum";
import { Status } from "./status.enum";
import { idGenerator } from "../utils/id-generator";

export class Bill {
	private _id: number;
	title: string;
	cost: bigint;
	frequency: Frequency;
	status: Status;
	due: Date;

	constructor(title: string, cost: bigint, frequency: Frequency, status: Status, due: Date) {
		this._id = idGenerator();	
		this.title = title;
		this.cost = cost;
		this.frequency = frequency;
		this.status = status;
		this.due = due;
	};

	public get id() {
		return this._id;
	}

	public toString():string {
		return `
		title: ${this.title}
		cost: ${this.cost}
		frequency: ${Frequency.toString(this.frequency)}
		status: ${Status.toString(this.status)}
		due to: ${this.due.getDay()}/${this.due.getMonth()}/${this.due.getFullYear()}`;
	};
};
