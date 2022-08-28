import { Frequency } from "./frequency.enum";
import { Status } from "./status.enum";

export namespace Bill {
	export class Bill {
		private _id: number;
		title: string;
		cost: bigint;
		frequency: Frequency.Frequency;
		status: Status.Status;
		due: Date;

		constructor(title: string, cost: bigint, frequency: Frequency.Frequency, status: Status.Status, due: Date) {
			this._id = 1;	
			this.title = title;
			this.cost = cost;
			this.frequency = frequency;
			this.status = status;
			this.due = due;
		};

		public get id() {
			return this._id;
		}

	};
};

