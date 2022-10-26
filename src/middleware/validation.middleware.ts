// import { validate, ValidationError } from "class-validator";
// import { plainToClass } from "class-transformer";
// import { HTTPException } from "../exceptions/HTTPException";
// import { NextFunction, Request, RequestHandler } from "express";

// const validationMiddleware = (
// 	type: any,
// 	value: string | 'body' | 'query' | 'params' = 'body',
// 	skipMissingProperties = false,
// 	whitelist = true,
// 	forbidNonWhitelisted = true,
// ): RequestHandler => {
// 	return (req, res, next) => {
// 		validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
// 			if (errors.length > 0) {
// 				const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
// 				next(new HTTPException(400, message));
// 			} else {
// 				next();
// 			}
// 		});
// 	};
// };
