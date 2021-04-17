import { ApiResponseProperty } from '@nestjs/swagger';
import { PagerResponse } from '../../../shared/types/pager/pager-response';
import { UserEntity } from '../../database/entities/user.entity';

class GetUsersItemResponse {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  email: string;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.email = entity.email;
  }
}

export class GetUsersResponse extends PagerResponse<GetUsersItemResponse> {
  @ApiResponseProperty({ type: [GetUsersItemResponse] })
  items: GetUsersItemResponse[];

  @ApiResponseProperty()
  totalItems: number;

  constructor(items: UserEntity[], totalItems: number) {
    super(
      items.map((i) => new GetUsersItemResponse(i)),
      totalItems,
    );
  }
}
