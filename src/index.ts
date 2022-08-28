import { Bill } from "./internals/bill";
import { Frequency } from "./internals/frequency.enum";
import {Status} from "./internals/status.enum";


const recurring = Frequency.Recurring;
const paid = Status.Paid;
const date = new Date();
const myBill = new Bill("bjj", 190n, recurring, paid,  date);
console.log(`${myBill.id}`);
