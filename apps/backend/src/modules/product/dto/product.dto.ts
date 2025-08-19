import { Unit } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { TransformDate } from '../../../common/class-transformer.types';
// import { UserId } from '../../user/types';
// import { UserDto } from '../../user/dto/user.dto';
import { OrderItemDto } from '../../order-item/dto/order-item.dto';
import { InventoryItemDto } from '../../inventory-item/dto/inventory-item.dto';
import type { CategoryId } from '../../category/types';
import { CategoryDto } from '../../category/dto/category.dto';

export class ProductDto {
  id: string;
  name: string;
  code: string;
  unit: Unit;
  // userId: UserId;
  categoryId: CategoryId;

  @Transform(({ value }: TransformDate) => value.toISOString(), {
    toPlainOnly: true,
  })
  createdAt: Date;
  @Transform(({ value }: TransformDate) => value.toISOString(), {
    toPlainOnly: true,
  })
  updatedAt: Date;

  // @Type(() => UserDto)
  // user?: UserDto;
  @Type(() => CategoryDto)
  category?: CategoryDto;
  @Type(() => OrderItemDto)
  orderItems?: OrderItemDto[];
  @Type(() => InventoryItemDto)
  inventoryItems?: InventoryItemDto[];
}
