import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RestGuard implements CanActivate {
  constructor(@Inject(AuthService.name) private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request) {
      if (!request.headers.authorization) {
        return false;
      }
      const user = await this.authService.validateRequest(request.headers.authorization);
      if (!user) return false;
      request.user = user;
      return true;
    }

    return false;
  }
}
