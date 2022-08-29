import { Frequency } from "./frequency.enum";
import { Status } from "./status.enum";
import { idGenerator } from "../utils/id-generator";

export class Bill {
	private _id: string;
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
	}

	public get id() {
		return this._id;
	}

	public set id(myid: string) {
		this._id = myid;
	}

	public toString():string {
		return `
		title: ${this.title}
		cost: ${this.cost}
		frequency: ${Frequency.toString(this.frequency)}
		status: ${Status.toString(this.status)}
		due to: ${this.due.getDay()}/${this.due.getMonth()}/${this.due.getFullYear()}`;
	}

	public payBill(): void | never {
		if(this.status === Status.Pending || Status.Overdue) {
			this.status = Status.Paid;
		} else if(this.status === Status.Paid) {
			throw new Error("Bill already paid");
		}
	}

	public isPaid():boolean {
		if(this.status === Status.Paid) {
			return true;
		} else return false;
	}

	public isPending():boolean {
		if(this.status === Status.Pending) {
			return true;
		} else return false;
	}

	public isOverdue():boolean {
		if(this.status === Status.Pending) {
			return true;
		} else return false;
	}

	public toJSON():string {
		const strBill = new BillString(this);	
		console.log(strBill); // is in fact an object
		return JSON.stringify(strBill);
	}

	/*
	public toJSON():string {
		const strBill = new UnmarshableBill(this);	
		return JSON.stringify(strBill);
	}
	*/
};

class BillString {
	id: string;
	title: string;
	cost: string;
	frequency: string;
	status: string;
	due: string;

	constructor(bill: Bill) {
		this.id = bill.id;
		this.title = bill.title;
		this.cost = bill.cost.toString();
		this.frequency = Frequency.toString(bill.frequency);
		this.status = Status.toString(bill.status);
		this.due = `${bill.due.getDay()}-${bill.due.getMonth()}-${bill.due.getFullYear()}`;
	}
};

/*
class UnmarshableBill {
	id: string;
	title: string;
	cost: number;
	frequency: string;
	status: string;
	due: Date;

	constructor(bill: Bill) {
		this.id = bill.id;
		this.title = bill.title;
		this.cost = Number(bill.cost);
		this.frequency = Frequency.toString(bill.frequency);
		this.status = Status.toString(bill.status);
		this.due = bill.due;
	}
}
*/

export namespace Bill {
	export const JSONParse = (JString : string): Bill => {
		const o = JSON.parse(JString) as BillString;
		const cost = BigInt(o.cost);
		const frequency = Frequency.toEnum(o.frequency);
		const status = Status.toEnum(o.status);
		const due = new Date(o.due);
		const parsed = new Bill(o.title, cost, frequency, status, due);	
		parsed.id = o.id;
		return parsed;
	}; 
};
