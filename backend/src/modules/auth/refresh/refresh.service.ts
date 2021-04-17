import { Inject, Injectable } from '@nestjs/common';
import { ResultValue } from '../../../shared/types/result-value';
import { UserService } from '../../user/user.service';
import { JwtService } from '../services/jwt.service';
import { ICurrentUser } from '../types/current-user.interface';
import { TokenDto } from '../types/token/token.dto';
import { RefreshResults } from './refresh-results.enum';

@Injectable()
export class RefreshService {
  constructor(
    @Inject(JwtService.name) private readonly jwtService: JwtService,
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}

  async refresh(currentUser: ICurrentUser): Promise<ResultValue<RefreshResults, TokenDto>> {
    const user = await this.userService.getOneById(currentUser.userId);

    if (user) {
      // TODO: check if token can be refresh i.e. whether user is banned or sth
      return new ResultValue(RefreshResults.OK, {
        token: this.jwtService.generateToken(user.id, this.jwtService.expiresIn),
        expiresIn: this.jwtService.expiresIn,
      });
    }

    return new ResultValue(RefreshResults.INVALID);
  }
}
