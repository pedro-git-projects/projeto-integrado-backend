import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET_KEY } from '../config/config';
import { HTTPException } from "../exceptions/HTTPException";
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';
import  userModel  from '../models/user.model';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HTTPException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HTTPException(404, 'Authentication token missing'));
    }
  } catch (err) {
    next(new HTTPException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
