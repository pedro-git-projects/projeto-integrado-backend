import {Router} from "express";
import AuthController from "../controllers/auth.controller";
import {Routes} from "../interfaces/routes.interface";
import authMiddleware from "../middleware/auth.middleware";

class AuthRoute implements Routes {
	public path = "/";
	public router = Router();
	public authController = new AuthController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(`${this.path}signup`, this.authController.signUp);
		this.router.post(`${this.path}signin`, this.authController.signIn);
		this.router.post(`${this.path}signout`, authMiddleware, this.authController.signOut);
	}
}

export default AuthRoute;
