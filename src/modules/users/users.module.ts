import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '@modules/auth';
// entities
import { User } from '@entities/user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  exports: [UsersService],
})
export class UsersModule {}
