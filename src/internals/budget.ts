import { Bill, BillString } from "./bill";

export class BudgetManager {
	private _totalBalance: bigint;
	bills: Bill[]; 

	constructor(initalBalance: bigint, bills:Bill[]) {
		this._totalBalance = initalBalance;
		this.bills = bills;
	}

	public get totalBalance() {
		return this._totalBalance;
	}

	public set totalBalance(value: bigint) {
		this._totalBalance = value;
	}

	public addMoney(value: bigint) {
		this._totalBalance += value;
	}

	public removeMoney(value: bigint) {
		this._totalBalance -= value;
	}

	public addBill(bill: Bill) {
		try {
			if(!this.isRepeated(bill)) {
				this.bills.push(bill);	
				console.log(`Bill added`);
			}
		} 
		catch(e:unknown) {
			console.log(`Duplicated bill`);	
		}

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
					this._totalBalance = this._totalBalance - this.bills[i].cost;
					console.log(`Bill paid successfully`);
				} 
				catch(e :unknown) {
					console.log(`Bill already paid`);
				}
			} 
		}
	}

	public getBillsByPaid() {
		const bills = this.bills;
		const paid = bills.filter(el => el.isPaid());
		return paid;
	}

	public getBillsByPending() {
		const bills = this.bills;
		const pending = bills.filter(el => el.isPending());
		return pending;
	}

	public getBillsByOverdue() {
		const bills = this.bills;
		const overdue = bills.filter(el => el.isOverdue());
		return overdue;
	}

	public removePaidBills() {
		const bills = this.bills;
		this.bills = bills.filter(el => !el.isPaid());
	}

	public toString():string {
		const balance = `Your blanace is: $${this._totalBalance}\n`;
		const complement = "\nYour bill list is as follows: \n"
		let accumulator: string = "";
		for(let i = 0; i < this.bills.length; i++) {
			accumulator += this.bills[i].toString();
			accumulator += "\n";
		}
		return balance + complement + accumulator;
	}

	public toJSON():string {
		let initial: string = `{\"totalBalance\":\"${this.totalBalance.toString()}\",\"bills\":`;
		let arr = "[";
		let json = initial += arr;
		for(let i = 0; i < this.bills.length; i++) {
			json += this.bills[i].toJSON();
			if(i != this.bills.length - 1) {
				json += ",";
			}
		}
		json += "]}";
		return json;
	}
	

	private isRepeated(bill: Bill): boolean | never {
		const bills = this.bills;
		let isRepeated = bills.find(el => el.id === bill.id)
		if (isRepeated !== undefined) {
			throw new Error("Repeated bill");
		} else {
			return false;
		}
	}
};

class BudgetString {
	totalBalance: string; 
	bills: string[]; 

	constructor(budget: BudgetManager) {
		let arr = [];
		for(let i = 0; i < budget.bills.length; i ++) {
			arr.push(budget.bills[i].toJSON())	
		}
		this.totalBalance = budget.totalBalance.toString();
		this.bills = arr;
		
	}

};

export namespace Budget {
	export const JSONParse = (JString: string) => {
		let bills:Bill[] = [];
		const budgetStr = JSON.parse(JString) as BudgetString;
		const balance = BigInt(budgetStr.totalBalance); 
		for(let i = 0; i < budgetStr.bills.length; i++) {
			let b = budgetStr.bills[i] as unknown as BillString; 
			bills.push(Bill.ParseBillStr(b));
		}
		return new BudgetManager(balance, bills);
	}; 
};
