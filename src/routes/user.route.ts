import { Router } from "express";
import UserController from "../controllers/user.controller";
import { Routes } from "../interfaces/routes.interface";

class UserRoute implements Routes {
	public path = "/user";
	public router = Router();
	public userController = new UserController(); 

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.userController.getUsers);
		this.router.get(`${this.path}/:id`, this.userController.getUserById);
		this.router.patch(`${this.path}/change-password`, this.userController.changePassword);
		this.router.put(`${this.path}/:id`, this.userController.updateUser);
		this.router.delete(`${this.path}/:id`, this.userController.deleteUser);
	}
}

export default UserRoute;
