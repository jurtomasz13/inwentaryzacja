import { Type } from 'class-transformer';
import { IsDate, IsString, IsNotEmpty } from 'class-validator';

export class UpdateInventoryDto {
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  name: string;
}
