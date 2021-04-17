import { IsInt, Max, Min } from 'class-validator';
import { PagerRequest } from '../../../shared/types/pager/pager-request';

export class GetUsersRequest extends PagerRequest {
  @IsInt()
  @Min(0)
  @Max(100)
  pageSize: number;

  @IsInt()
  @Min(0)
  pageNumber: number;
}
