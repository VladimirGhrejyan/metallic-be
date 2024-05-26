import { Body, Controller, Post } from '@nestjs/common';
//
import { UsersService } from './users.service';
// dto
import { CreateUserDto } from '@common/dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
}
