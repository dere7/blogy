import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class PaginationQueryDto {
  // #posts to return per request
  @IsNumber()
  @Transform(({ value }) => Number(value))
  limit?: number = 10;

  // page to return
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page?: number = 1;
}
