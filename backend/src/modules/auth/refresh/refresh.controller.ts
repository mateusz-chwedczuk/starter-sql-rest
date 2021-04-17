import { BadRequestException, Controller, HttpCode, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUserProvider } from '../decorators/current-user-provider.decorator';
import { RestGuard } from '../guards/rest.guard';
import { ICurrentUser } from '../types/current-user.interface';
import { TokenDto } from '../types/token/token.dto';
import { RefreshResults } from './refresh-results.enum';
import { RefreshService } from './refresh.service';

@Controller('auth')
@ApiTags('Auth')
export class RefreshController {
  constructor(@Inject(RefreshService.name) private readonly refreshService: RefreshService) {}

  @Post('refresh')
  @HttpCode(200)
  @UseGuards(RestGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TokenDto })
  @ApiBadRequestResponse()
  @ApiForbiddenResponse()
  async refresh(@CurrentUserProvider() currentUser: ICurrentUser): Promise<TokenDto> {
    const result = await this.refreshService.refresh(currentUser);
    switch (result.type) {
      case RefreshResults.OK:
        return result.payload;
      case RefreshResults.INVALID:
      default:
        throw new BadRequestException();
    }
  }
}
