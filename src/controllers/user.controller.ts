import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
import {SECRET_KEY} from "../config/config";
import {ChangePswdDTO} from "../dto/pswd.dto";
import {CreateUserDto} from "../dto/user.dto";
import {DataStoredInToken} from "../interfaces/auth.interface";
import {User} from "../interfaces/user.interface";
import UserService from "../services/user.service";

class UserController {
	public userService = new UserService();

	public getUsers = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const findUsersData: User[] = await this.userService.findAllUsers();
			res.status(200).json({data: findUsersData, message: "find all"});
		} catch(err) {
			next(err);
		}
	}

	public getUserById = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const ID = req.params.id;
			const findUserData: User = await this.userService.findUserById(ID);
			res.status(200).json({data: findUserData, message: "find one"});
		} catch (err) {
			next(err);	
		}
	} 

	public changePassword = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const data = verify(req.cookies.Authorization, SECRET_KEY) as DataStoredInToken; 
			const ID = data._id;
			const changePswdData: ChangePswdDTO = req.body;	
			const changePswd = await this.userService.changePassword(ID, changePswdData);
			res.status(200).json({data: changePswd, message: "password changed successfully"})
		} catch(err) {
			next(err);
		}
	} 

	public updateUser = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const ID = req.params.id;
			const userData: CreateUserDto = req.body;
			const updateUserData: User = await this.userService.updateUser(ID, userData); 
			res.status(200).json({data: updateUserData, message: "updated"});
		} catch(err) {
			next(err);
		}
	} 

	public deleteUser = async(req: Request, res: Response, next:NextFunction) => {
		try {
			const ID = req.params.id;
			const deletedUserData: User = await this.userService.deleteUser(ID);
			res.status(200).json({data: deletedUserData, message: "deleted"});
		} catch(err) {
			next(err);
		}
	}
}


export default UserController;
