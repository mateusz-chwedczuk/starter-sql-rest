import { ApiResponseProperty } from '@nestjs/swagger';
import { IToken } from './token.interface';

export class TokenDto implements IToken {
  @ApiResponseProperty()
  token: string;

  @ApiResponseProperty()
  expiresIn: number;
}
