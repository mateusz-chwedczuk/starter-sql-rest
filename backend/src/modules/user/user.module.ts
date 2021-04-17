import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../database/entities/user.entity';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, RegisterService],
  controllers: [UserController, RegisterController],
  exports: [UserService],
})
export class UserModule {}
