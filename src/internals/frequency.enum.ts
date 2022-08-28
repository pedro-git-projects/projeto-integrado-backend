export namespace Frequency {

	export enum Frequency {
		Recurring,
		OneTime
	}; 

	export const toString = (f: Frequency): string => {
		let str: string = ""; 
		if(f === 0) {
			str = "Frequency"; 
		} else if(f === 1) {
			str= "OneTime";
		} 
		return str;
	};
};
