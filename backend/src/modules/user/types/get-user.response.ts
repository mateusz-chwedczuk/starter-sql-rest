import { ApiResponseProperty } from '@nestjs/swagger';
import { UserEntity } from '../../database/entities/user.entity';

export class GetUserResponse {
  @ApiResponseProperty()
  id: number;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  email: string;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.email = entity.email;
  }
}
