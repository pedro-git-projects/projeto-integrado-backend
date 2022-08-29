export enum Frequency {
		Recurring,
		OneTime
};

export namespace Frequency {
	export const toString = (f: Frequency): string => {
		let str: string = ""; 
		if(f === 0) {
			str = "Recurring"; 
		} else if(f === 1) {
			str= "OneTime";
		} 
		return str;
	};

	export const toEnum = (s: string): Frequency | never => {
		if(s === "Recurring") {
			return Frequency.Recurring;
		} else if(s === "OneTime") {
			return Frequency.OneTime;
		} else {
			throw new Error("Unprocessable String");
		}
	}
};
