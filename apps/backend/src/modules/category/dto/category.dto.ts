import { Transform, Type } from 'class-transformer';
import { TransformDate } from '../../../common/class-transformer.types';
import { UserId } from '../../user/types';
import { ProductDto } from '../../product/dto/product.dto';
import { UserDto } from '../../user/dto/user.dto';

export class CategoryDto {
  id: string;
  name: string;
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
  @Type(() => ProductDto)
  products?: ProductDto[];
}
