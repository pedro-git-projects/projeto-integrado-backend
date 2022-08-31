import express from "express";
import {Routes} from "./internals/routes.interface";
import {errorMiddleware} from "./middleware/error.middleware";

export class App {
	public app: express.Application;
	public port: string | number;

	constructor(routes: Routes[]) {
		this.app = express();
		this.port = 3000;

		this.initializeMiddleware();
		this.initializeRoutes(routes);
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

	private initializeMiddleware() {
		this.app.use(express.json());
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}
}
