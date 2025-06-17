import { IsString } from 'class-validator';

export class UpdateRoomDto {
  @IsString()
  id: string;

  @IsString()
  name: string;
}
