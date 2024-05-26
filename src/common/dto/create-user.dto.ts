import { IUser } from '@modules/users/user.interface';
import { IsString, Length } from 'class-validator';

export class CreateUserDto implements Partial<IUser> {
  @IsString({ message: 'Username should be a string' })
  readonly username: string;
  @IsString({ message: 'Password should be a string' })
  @Length(4, 20, { message: 'Password should be not less than 4 and not more than 20' })
  readonly password: string;
}
