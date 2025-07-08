import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import type { ProductId } from '../../product/types';
import type { RoomId } from '../../room/types';
import type { InventoryId } from '../../inventory/dto/inventory.dto';

export class CreateInventoryItemDto {
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  productId: ProductId;

  @IsString()
  @IsNotEmpty()
  roomId: RoomId;
}

export class CreateStandaloneInventoryItemDto extends CreateInventoryItemDto {
  @IsString()
  @IsNotEmpty()
  inventoryId: InventoryId;
}
