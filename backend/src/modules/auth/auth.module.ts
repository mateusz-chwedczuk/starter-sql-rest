import { Global, Module } from '@nestjs/common';
import { JwtService } from './services/jwt.service';
import { AuthService } from './services/auth.service';
import { RefreshService } from './refresh/refresh.service';
import { LoginService } from './login/login.service';
import { LoginController } from './login/login.controller';
import { RefreshController } from './refresh/refresh.controller';
import { UserModule } from '../user/user.module';

@Global()
@Module({
  imports: [UserModule],
  controllers: [LoginController, RefreshController],
  providers: [JwtService, AuthService, LoginService, RefreshService],
  exports: [AuthService],
})
export class AuthModule {}
