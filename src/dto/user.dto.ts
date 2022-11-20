import { IsEmail, IsEnum, IsString } from 'class-validator';
import {Group} from '../interfaces/group.enum';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsEnum(Group)
  public group: string;
}
