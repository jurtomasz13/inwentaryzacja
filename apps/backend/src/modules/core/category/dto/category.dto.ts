import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  @Expose()
  createdAt: Date;

  @IsDateString()
  @IsNotEmpty()
  @Expose()
  updatedAt: Date;

  // Add related fields
}
