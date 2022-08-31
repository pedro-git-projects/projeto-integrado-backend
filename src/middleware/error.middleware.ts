import { Request, Response, NextFunction } from "express";
import { HTTPException } from "../exceptions/HTTPException";

export const errorMiddleware = (error: HTTPException, req: Request, res: Response, next: NextFunction) => {
	try {
		const status: number = error.status || 500;
		const message: string = error.message || 'Something went wrong';

		console.error(`[${req.method}] ${req.path} >> StatusCode::${status}, Message::${message}`);
		res.status(status).json({message});
	} catch(error) {
		next(error);
	}
};
