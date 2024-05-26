import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
// modules
import { UsersService } from '@modules/users';
// entities
import { User } from '@entities/user.entity';
// dto
import { CreateUserDto } from '@common/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signIn(signInDto: CreateUserDto) {
    const user = await this.validateUserOrThrowException(signInDto);
    return this.generateToken(user);
  }

  public async signUp(signUpDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByUsername(signUpDto.username);

    if (candidate) {
      throw new HttpException(
        `User with username ${signUpDto.username} already exists`,
        HttpStatus.CONFLICT,
      );
    }

    const hashPassword = await bcrypt.hash(signUpDto.password, 5);

    const user = await this.usersService.createUser({
      ...signUpDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      username: user.username,
      id: user.id,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUserOrThrowException(signInDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.getUserByUsername(signInDto.username);

    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    const passwordEquals = await bcrypt.compare(signInDto.password, user.password);

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException('Invalid password');
  }
}
