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
};
