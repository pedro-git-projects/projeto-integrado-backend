import { Bill } from "./internals/bill";
import { Frequency } from "./internals/frequency.enum";
import {Status} from "./internals/status.enum";


const recurring = Frequency.Recurring;
const paid = Status.Paid;
const date = new Date('2020-01-01');
const myBill = new Bill("bjj", 190n, recurring, paid,  date);
console.log(`${myBill.id}`);
console.log(`${myBill.toString()}`);
