import * as mongoDB from "mongodb";

export const collections : { budget?: mongoDB.Collection } = {};

const connectionString: string = "mongodb://127.0.0.1:27017/pi"; 

export async function connectToDatabase() {
	const client: mongoDB.MongoClient = new mongoDB.MongoClient(connectionString);
	await client.connect().catch(err => console.log(err));
	const db: mongoDB.Db = client.db();

	const budgetCollection: mongoDB.Collection = db.collection("budgetmanager");
	collections.budget = budgetCollection;

	console.log(`=========================================================================`);
	console.log(`Successfully connected to database: ${db.databaseName} and collection ${budgetCollection.collectionName} ✔️  `);	
	console.log(`=========================================================================`);
}
