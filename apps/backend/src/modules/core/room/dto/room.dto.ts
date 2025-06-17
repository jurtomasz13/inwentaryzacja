import { Expose } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class RoomDto {
  @IsString()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @Expose()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  @Expose()
  createdAt: Date;

  @IsDateString()
  @IsNotEmpty()
  @Expose()
  updatedAt: Date;
}
