import { Expose } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @Expose()
  name: string;

  @IsString()
  @IsOptional()
  @Expose()
  description?: string;
}
