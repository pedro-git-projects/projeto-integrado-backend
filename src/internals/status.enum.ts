export enum Status {
	Paid,
	Pending	
};

export namespace Status {
	export const toString = (s: Status): string => {
		let str: string = ""; 
		if(s === 0) {
			str = "Paid"; 
		} else if(s === 1) {
			str= "Pending";
		} 
		return str;
	};
};
