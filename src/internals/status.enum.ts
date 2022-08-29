export enum Status {
	Paid,
	Pending,
	Overdue
};

export namespace Status {
	export const toString = (s: Status): string => {
		let str: string = ""; 
		if(s === 0) {
			str = "Paid"; 
		} else if(s === 1) {
			str= "Pending";
		} else if (s === 2) {
			str = "Overdue";
		} 
		return str;
	};

	export const toEnum = (s: string): Status | never => {
		if(s === "Paid") {
			return Status.Paid;
		} else if(s === "Pending") {
			return Status.Pending;
		} else if(s === "Overdue"){
			return Status.Overdue;
		} else {
			throw new Error("Unprocessable String");
		}
	};

};
