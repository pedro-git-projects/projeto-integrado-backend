import userModel from "../models/user.model";
import { CreateUserDto } from "../dto/user.dto";
import {User} from "../interfaces/user.interface";
import {isEmpty} from "../utils/empty";
import {HTTPException} from "../exceptions/HTTPException";
import {compare, hash} from "bcrypt";
import {DataStoredInToken, TokenData} from "../interfaces/auth.interface";
import { SECRET_KEY } from "../config/config";
import {sign} from "jsonwebtoken";

class AuthService {
  public users = userModel; 

  public async signUp(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HTTPException(400, "user data is empty");

    const findUser: User|null = await this.users.findOne({email: userData.email});
    if(findUser) throw new HTTPException(409, `email ${userData.email} is already registered`);

    const hashedPassword: string = await hash(userData.password, 10); 
    const createUserData: User = await this.users.create({...userData, password: hashedPassword});
    
    return createUserData;
  }

  public async signIn(userData: CreateUserDto): Promise<{cookie: string; findUser: User}> {
    if(isEmpty(userData)) throw new HTTPException(400, "user data is empty");

    const findUser: User|null = await this.users.findOne({email: userData.email});
    if(!findUser) throw new HTTPException(409, `user with email ${userData.email} was not found`); 

    const pswdMatch: boolean = await compare(userData.password, findUser.password);
    if(!pswdMatch) throw new HTTPException(409, "incorrect password");

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async signOut(userData: User): Promise<User> {
    if(isEmpty(userData)) throw new HTTPException(400, "user data is empty");

    const findUser: User|null = await this.users.findOne({email: userData.email, password: userData.password});
    if(!findUser) throw new HTTPException(409, `email ${userData.email} not found`);

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = {_id: user._id, group: user.group};
    const secretKey: string = SECRET_KEY; 
    const expiresIn: number = 60 * 60;
    return { expiresIn, token: sign(dataStoredInToken, secretKey, {expiresIn})}
  }

  public createCookie(tokenData: TokenData): string { 
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
}

export default AuthService;
