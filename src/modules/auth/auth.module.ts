import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
//
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// modules
import { UsersModule } from '@modules/users';
// config
import { getJwtConfig } from '@config/jwt.config';

@Module({
  imports: [forwardRef(() => UsersModule), JwtModule.register(getJwtConfig())],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
