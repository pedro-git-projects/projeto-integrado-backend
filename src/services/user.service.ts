import { hash } from "bcrypt";
import { CreateUserDto } from "../dto/user.dto";
import { HTTPException } from "../exceptions/HTTPException";
import { User } from "../interfaces/user.interface";
import userModel from "../models/user.model";
import { isEmpty } from "../utils/empty";

class UserService {
  public users = userModel;

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User|never> {
    if (isEmpty(userId)) throw new HTTPException(400, "UserId is empty");

    const findUser: User|null = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HTTPException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HTTPException(400, "userData is empty");

    const findUser: User|null = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HTTPException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HTTPException(400, "userData is empty");

    if (userData.email) {
      const findUser: User|null = await this.users.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HTTPException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User|null = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HTTPException(409, "User doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User|null = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HTTPException(409, "User doesn't exist");

    return deleteUserById;
  }
}

export default UserService;
