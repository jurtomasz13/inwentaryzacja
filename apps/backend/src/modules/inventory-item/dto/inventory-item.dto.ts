import { Transform, Type } from 'class-transformer';
import { TransformDate } from '../../../common/class-transformer.types';
import { ProductDto } from '../../product/dto/product.dto';
import { ProductId } from '../../product/types';
import { RoomId } from '../../room/types';
import { InventoryDto, InventoryId } from '../../inventory/dto/inventory.dto';
import { RoomDto } from '../../room/dto/room.dto';

export class InventoryItemDto {
  id: string;
  quantity: number;
  productId: ProductId;
  roomId: RoomId;
  inventoryId: InventoryId;

  @Transform(({ value }: TransformDate) => value.toISOString(), {
    toPlainOnly: true,
  })
  createdAt: Date;
  @Transform(({ value }: TransformDate) => value.toISOString(), {
    toPlainOnly: true,
  })
  updatedAt: Date;

  @Type(() => ProductDto)
  product?: ProductDto;
  @Type(() => RoomDto)
  room?: RoomDto;
  @Type(() => InventoryDto)
  inventory?: InventoryDto;
}

export type InventoryItemId = InventoryItemDto['id'];
