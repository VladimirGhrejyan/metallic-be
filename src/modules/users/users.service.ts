import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// entities
import { User } from '@entities/user.entity';
// dtos
import { CreateUserDto } from '@common/dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) protected readonly usersRepository: Repository<User>) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    const newUser: User = await this.usersRepository.save(dto);
    return newUser;
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }
}
