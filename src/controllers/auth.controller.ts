import { Request, Response, NextFunction } from "express";
import {CreateUserDto} from "../dto/user.dto";
import AuthService from "../services/auth.service";
import { User } from "../interfaces/user.interface";
import {RequestWithUser} from "../interfaces/auth.interface";

class AuthController {
	public authService = new AuthService(); 

	public signUp = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const userData: CreateUserDto = req.body;
			const signUpUserData: User = await this.authService.signUp(userData);

			res.status(201).json({data: signUpUserData, message: "signed up"});
		} catch(err) {
			next(err);
		}
	}

	public signIn = async(req: Request, res: Response, next: NextFunction) => {
		try {
			const userData: CreateUserDto = req.body;
			const {cookie, findUser} = await this.authService.signIn(userData);

			res.setHeader("Set-Cookie", [cookie]);
			res.status(200).json({data: findUser, message: "signed in"});
		} catch(err) {
			next(err);
		}
	}

	public signOut = async(req: RequestWithUser, res: Response, next: NextFunction) => {
		try {
      		const userData: User = req.user;
			const signOutUserData: User = await this.authService.signOut(userData);
      		res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
			res.status(200).json({data: signOutUserData, message: "signed out"});
		} catch(err) {
			next(err);
		}
	}
}

export default AuthController;
