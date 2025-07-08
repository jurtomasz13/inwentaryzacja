import { Unit } from '@prisma/client';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import type { CategoryId } from '../../category/types';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsEnum(() => Unit)
  unit: Unit;

  @IsOptional()
  @IsString()
  categoryId: CategoryId;
}
