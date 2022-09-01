import express from "express";
import {Routes} from "./internals/routes.interface";
import {errorMiddleware} from "./middleware/error.middleware";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";


export class App {
	public app: express.Application;
	public port: string | number;

	constructor(routes: Routes[]) {
		this.app = express();
		this.port = 3000;

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
