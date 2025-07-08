import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateInventoryDto {
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  name: string;
}
