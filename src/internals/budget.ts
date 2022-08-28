import { Bill } from "./bill";

export class BudgetManager {
	totalBalance: bigint;
	bills: Bill[]; 

	constructor(initalBalance: bigint, bills:Bill[]) {
		this.totalBalance = initalBalance;
		this.bills = bills;
	}

	public addBill(bill: Bill) {
		this.bills.push(bill);
	}

	public removeBill(bill: Bill) {
		for(let i = 0; i < this.bills.length; i++) {
			if(this.bills[i].id === bill.id) {
				this.bills.splice(i, 1);
			}
		}
	}	

	public payBillById(id: string) {
		for(let i = 0; i < this.bills.length; i++) {
			if(this.bills[i].id === id) {
				try {
					this.bills[i].payBill()
					this.totalBalance = this.totalBalance - this.bills[i].cost;
					console.log(`Bill paid successfully`);

				} catch(e :unknown) {
					console.log(`Bill already paid`);
				}
			} 
		}
	}

	public toString():string {
		const balance = `Your blanace is: $${this.totalBalance}\n`;
		const complement = "\nYour bill list is as follows: \n"
		let accumulator: string = "";
		for(let i = 0; i < this.bills.length; i++) {
			accumulator += this.bills[i].toString();
			accumulator += "\n";
		}
		return balance + complement + accumulator;
	}
};
