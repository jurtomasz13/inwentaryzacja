import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../../decorators/user.decorator';
import { RoomService } from './room.service';
import { UpdateRoomDto } from './dto/update-room.dto';
import type { RoomId } from './types';
import { UserDto } from '../user/dto/user.dto';

@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  getAll(@User() user: UserDto) {
    return this.roomService.findAll(user.id);
  }

  @Get(':id')
  get(@Param('id') id: RoomId, @User() user: UserDto) {
    return this.roomService.findOneById(id, user.id);
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto, @User() user: UserDto) {
    return this.roomService.create(createRoomDto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: RoomId,
    @Body() updateRoomDto: UpdateRoomDto,
    @User() user: UserDto
  ) {
    return this.roomService.update(id, updateRoomDto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: RoomId, @User() user: UserDto) {
    return this.roomService.delete(id, user.id);
  }
}
