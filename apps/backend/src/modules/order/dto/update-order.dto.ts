import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { UpdateOrderItemDto } from '../../order-item/dto/update-order-item.dto';

export class UpdateOrderDto {
  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  inventoryId: string;

  @Type(() => UpdateOrderItemDto)
  orderItems: UpdateOrderItemDto[];
}
