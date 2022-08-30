import { Bill } from "./internals/bill";
import {BudgetManager} from "./internals/budget";
import { Frequency } from "./internals/frequency.enum";
import {Status} from "./internals/status.enum";
import { Budget } from "./internals/budget";


const recurring = Frequency.Recurring;
const paid = Status.Paid;
const pending = Status.Pending; 
const date = new Date('2020-01-01');
const myBill = new Bill("bjj", 190n, recurring, paid,  date);
// console.log(`${myBill.id}`);
// console.log(`${myBill.toString()}`);
// console.log(`${myBill.toString()}`);


const myBill2 = new Bill("1", 190n, recurring, pending,  date);
const myBill3 = new Bill("2", 190n, recurring, pending,  date);
const myBill4 = new Bill("3", 190n, recurring, pending,  date);

let bills = [myBill, myBill2, myBill3, myBill4];

let budget = new BudgetManager(1000n, bills); 
//console.log(`${budget.toString()}`)
budget.addBill(myBill2);
//console.log(`${budget.toString()}`)
//console.log(`------------------`)

// budget.removeBill(myBill2);
//console.log(`${budget.toString()}`)

//budget.payBillById(myBill4.id);
//budget.payBillById(myBill3.id);
//console.log(`${budget.toString()}`);
budget.payBillById(myBill3.id);
//console.log(`${budget.getBillsByPaid().toString()}`);
//console.log(`${budget.toString()}`)
// budget.removePaidBills();
// console.log(`${budget.toString()}`);
const JSONBill = myBill4.toJSON();
console.log("AAAAAAAA" + JSONBill); // correctly returning JSON
//const ObjBill = Bill.JSONParse(JSONBill); 
//console.log(ObjBill);
const BudgetJSON = budget.toJSON();
console.log(BudgetJSON);
const parsed = Budget.JSONParse(BudgetJSON);
console.log(parsed)
