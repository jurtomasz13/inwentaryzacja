import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '../../../decorators/user.decorator';
import { UserDto } from '../user/dto/user.dto';
import { RoomService } from './room.service';

@UseGuards(JwtAuthGuard)
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  getAll(@User() user: UserDto) {
    return this.roomService.findAll(user.id);
  }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto, @User() user: UserDto) {
    return this.roomService.create(createRoomDto, user.id);
  }
}
