import { Unit } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import type { CategoryId } from '../../category/types';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(Unit)
  unit: Unit;

  @IsString()
  @IsNotEmpty()
  categoryId: CategoryId;
}
