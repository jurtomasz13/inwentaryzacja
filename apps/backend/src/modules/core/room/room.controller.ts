import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../../../decorators/user.decorator';
import { UserDto } from '../user/dto/user.dto';
import { RoomService } from './room.service';
import { UpdateRoomDto } from './dto/update-room.dto';

@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  getAll(@User() user: UserDto) {
    return this.roomService.findAll(user.id);
  }

  @Get(':id')
  get(@User() user: UserDto, @Param('id') id: string) {
    return this.roomService.findOneById(id, user.id);
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto, @User() user: UserDto) {
    return this.roomService.create(createRoomDto, user.id);
  }

  @Patch()
  update(@Body() updateRoomDto: UpdateRoomDto, @User() user: UserDto) {
    return this.roomService.update(updateRoomDto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @User() user: UserDto) {
    return this.roomService.delete(id, user.id);
  }
}
