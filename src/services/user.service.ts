import { hash } from "bcrypt";
import { CreateUserDto } from "../dto/user.dto";
import { HTTPException } from "../exceptions/HTTPException";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";
import { isEmpty } from "../utils/empty";
import {ChangePswdDTO} from "../dto/pswd.dto";

class UserService {
  public users = userModel;

  public async findAllUsers(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(ID: string): Promise<User|never> {
    if (isEmpty(ID)) throw new HTTPException(400, "id is empty");

    const findUser: User|null = await this.users.findOne({ _id: ID});
    if (!findUser) throw new HTTPException(409, "user doesn't exist");

    return findUser;
  }

  public async updateUser(ID: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HTTPException(400, "userData is empty");

    if (userData.email) {
      const findUser: User|null = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != ID) throw new HTTPException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User|null = await this.users.findByIdAndUpdate(ID, { userData });
    if (!updateUserById) throw new HTTPException(409, "User doesn't exist");

    return updateUserById;
  }

  // TODO: FIX
  public async changePassword(ID: string, changePassword: ChangePswdDTO): Promise<User> {
    if(isEmpty(ID) || isEmpty(changePassword.oldPassword)) throw new HTTPException(422, "please make sure you're logged in");

    if(isEmpty(changePassword.newPassword)) throw new HTTPException(409, "missing new password");
    const hashedPswd = await hash(changePassword.newPassword, 10);

    const toUpdate = await this.users.findOne({_id: ID});
    if(!toUpdate) throw new HTTPException(409, "could not find user");
    console.log(toUpdate.password)

    if(toUpdate.password !== changePassword.oldPassword) throw new HTTPException(401, "wrong password");

    toUpdate.password = hashedPswd;
    const updated: User = await toUpdate.save();
    if(!updated) throw new HTTPException(500, "internal server error");

    return updated;
  }

  public async deleteUser(ID: string): Promise<User> {
    const deleteUserById: User|null = await this.users.findByIdAndDelete(ID);
    if (!deleteUserById) throw new HTTPException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
