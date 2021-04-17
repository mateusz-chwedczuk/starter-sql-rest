import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ICurrentUser } from '../types/current-user.interface';

@Injectable()
export class JwtService {
  constructor() {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) throw new Error('Missing JWT secret env var.');
  }

  get expiresIn(): number {
    return 1800;
  }

  generateToken(userId: number, expiresIn: number): string {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
  }

  async validateToken(authHeader: string): Promise<{ userId: number }> {
    try {
      const token = authHeader.split(' ')[1];
      const user = jwt.verify(token, process.env.JWT_SECRET) as ICurrentUser;
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
