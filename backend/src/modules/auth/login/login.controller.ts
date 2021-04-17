import { BadRequestException, Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TokenDto } from '../types/token/token.dto';
import { LoginResults } from './login-results.enum';
import { LoginRequest } from './login.request';
import { LoginService } from './login.service';

@Controller('auth')
@ApiTags('Auth')
export class LoginController {
  constructor(@Inject(LoginService.name) private readonly loginService: LoginService) {}

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginRequest })
  @ApiOkResponse({ type: TokenDto })
  @ApiBadRequestResponse()
  async login(@Body() dto: LoginRequest): Promise<TokenDto> {
    const result = await this.loginService.login(dto);
    switch (result.type) {
      case LoginResults.OK:
        return result.payload;
      case LoginResults.INVALID:
      default:
        throw new BadRequestException();
    }
  }
}
