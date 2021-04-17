import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '../services/jwt.service';
import { LoginResults } from './login-results.enum';
import { ResultValue } from '../../../shared/types/result-value';
import { LoginRequest } from './login.request';
import { TokenDto } from '../types/token/token.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class LoginService {
  constructor(
    @Inject(JwtService.name) private readonly jwtService: JwtService,
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}

  async login(dto: LoginRequest): Promise<ResultValue<LoginResults, TokenDto>> {
    const user = await this.userService.getOneByEmail(dto.email);

    if (user) {
      if (await bcrypt.compare(dto.password, user.passwordHash)) {
        return new ResultValue(LoginResults.OK, {
          token: this.jwtService.generateToken(user.id, this.jwtService.expiresIn),
          expiresIn: this.jwtService.expiresIn,
        });
      }
    }

    return new ResultValue(LoginResults.INVALID);
  }
}
