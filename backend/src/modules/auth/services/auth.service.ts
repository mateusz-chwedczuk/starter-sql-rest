import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { ICurrentUser } from '../types/current-user.interface';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JwtService.name) private readonly jwtService: JwtService,
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}

  async validateRequest(authHeader: string): Promise<ICurrentUser> {
    const decodedUser = await this.jwtService.validateToken(authHeader);
    const foundUser = await this.userService.getOneById(decodedUser.userId);
    if (!foundUser) return null;
    return {
      userId: foundUser.id,
    };
  }
}
