import express from "express";
import {Routes} from "./internals/routes.interface";
import {errorMiddleware} from "./middleware/error.middleware";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import * as mongoDB from "mongodb";

export class App {
	public app: express.Application;
	public port: string | number;
	public connectionString: string;
	public collections : { budget?: mongoDB.Collection };

	private client: mongoDB.MongoClient;
	private db: mongoDB.Db;

	constructor(routes: Routes[]) {
		this.port = 3000;
		this.app = express();

		this.collections = {};

		this.connectionString = "mongodb://127.0.0.1:27017/pi"; 
		this.connectToDatabase();

		this.initializeMiddleware();
		this.initializeRoutes(routes);
		this.initializeSwagger();
		this.initializeErrorHandling();
	}

	public getServer() {
		return this.app;
	}

	public listen() {
		this.app.listen(this.port, () => {
			console.log(`===============================`);
			console.log(`🚀 App listening on port ${this.port}`);
			console.log(`===============================`);
		});
	}

	private async connectToDatabase() {
		this.client = new mongoDB.MongoClient(this.connectionString);
		await this.client.connect().catch(err => console.log(err));
		this.db = this.client.db();

		const budgetCollection: mongoDB.Collection = this.db.collection("budgetmanager");
		this.collections.budget = budgetCollection;
		
		console.log(`=========================================================================`);
        console.log(`Successfully connected to database: ${this.db.databaseName} and collection ${budgetCollection.collectionName} ✔️  `);	
		console.log(`=========================================================================`);

	}

	private initializeRoutes(routes: Routes[]) {
		routes.forEach(route => {
			this.app.use('/', route.router)
		});
	}


	private initializeSwagger() {
		const options = {
			swaggerDefinition: {
				info: {
					title: 'Budget Manager',
					version: '1.0.0',
					description: 'Projeto Integrado Backend',
				},
			},
			apis: ['swagger.yaml'],
		};

		const specs = swaggerJSDoc(options);
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
	}

	private initializeMiddleware() {
		this.app.use(express.json());
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}
}
