import { Body, Controller, Post } from '@nestjs/common';
//
import { AuthService } from './auth.service';
// dto
import { CreateUserDto } from '@common/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() signInDto: CreateUserDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('sign-up')
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.signUp(signUpDto);
  }
}
