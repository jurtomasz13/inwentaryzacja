import { Transform, Type } from 'class-transformer';
import { TransformDate } from '../../../common/class-transformer.types';
import { UserId } from '../../user/types';
import { UserDto } from '../../user/dto/user.dto';
import { InventoryItemDto } from '../../inventory-item/dto/inventory-item.dto';

export class RoomDto {
  id: string;
  name: string;
  description: string;
  userId: UserId;

  @Transform(({ value }: TransformDate) => value.toISOString(), {
    toPlainOnly: true,
  })
  createdAt: Date;
  @Transform(({ value }: TransformDate) => value.toISOString(), {
    toPlainOnly: true,
  })
  updatedAt: Date;

  @Type(() => UserDto)
  user?: UserDto;
  @Type(() => InventoryItemDto)
  inventoryItems?: InventoryItemDto[];
}
