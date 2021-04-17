import { Controller, Get, Inject, NotFoundException, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentUserProvider } from '../auth/decorators/current-user-provider.decorator';
import { RestGuard } from '../auth/guards/rest.guard';
import { ICurrentUser } from '../auth/types/current-user.interface';
import { GetUserResponse } from './types/get-user.response';
import { GetUsersRequest } from './types/get-users.request';
import { GetUsersResponse } from './types/get-users.response';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(@Inject(UserService.name) private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(RestGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GetUserResponse })
  @ApiNotFoundResponse()
  @ApiForbiddenResponse()
  async getCurrentUser(@CurrentUserProvider() currentUser: ICurrentUser): Promise<GetUserResponse> {
    const entity = await this.userService.getOneById(currentUser.userId);
    if (!entity) throw new NotFoundException();
    return new GetUserResponse(entity);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: GetUserResponse })
  @ApiNotFoundResponse()
  async getUser(@Param('id', ParseIntPipe) userId: number): Promise<GetUserResponse> {
    const entity = await this.userService.getOneById(userId);
    if (!entity) throw new NotFoundException();
    return new GetUserResponse(entity);
  }

  @Get()
  @ApiQuery({ name: 'pageSize', type: Number })
  @ApiQuery({ name: 'pageNumber', type: Number })
  @ApiOkResponse({ type: GetUsersResponse })
  async getUsers(@Query() query: GetUsersRequest): Promise<GetUsersResponse> {
    const [entities, totalItems] = await this.userService.getManyAndCount(query.pageSize, query.pageNumber);
    return new GetUsersResponse(entities, totalItems);
  }
}
