import { BadRequestException, Body, ConflictException, Controller, Inject, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegisterResults } from './register-results.enum';
import { RegisterRequest } from './register.request';
import { RegisterService } from './register.service';

@Controller('users')
@ApiTags('User')
export class RegisterController {
  constructor(@Inject(RegisterService.name) private readonly registerService: RegisterService) {}

  @Post('register')
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse({ description: 'Email taken.' })
  async register(@Body() dto: RegisterRequest): Promise<void> {
    const result = await this.registerService.register(dto);
    switch (result.type) {
      case RegisterResults.OK:
        return;
      case RegisterResults.EMAIL_EXISTS:
        throw new ConflictException('Email taken.');
      case RegisterResults.INVALID:
      default:
        throw new BadRequestException();
    }
  }
}
