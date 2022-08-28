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
};
