import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import type { OrderId } from '../../order/dto/order.dto';
import type { ProductId } from '../../product/types';
import type { OrderItemId } from './order-item.dto';

export class UpdateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  id: OrderItemId;

  @IsOptional()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  productId: ProductId;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  orderId: OrderId;
}
