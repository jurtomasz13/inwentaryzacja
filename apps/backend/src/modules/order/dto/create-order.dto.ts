import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import type { InventoryId } from '../../inventory/dto/inventory.dto';
import { CreateOrderItemDto } from '../../order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  inventoryId: InventoryId;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];
}
