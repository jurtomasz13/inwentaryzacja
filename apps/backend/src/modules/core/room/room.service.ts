import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Room } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../user/dto/user.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    CreateRoomDto: CreateRoomDto,
    userId: UserDto['id']
  ): Promise<RoomDto> {
    try {
      const roomEntity = await this.prisma.room.create({
        data: {
          name: CreateRoomDto.name,
          user: {
            connect: { id: userId },
          },
        },
      });

      return this.mapToDto(roomEntity);
    } catch (error) {
      if (!this.prisma.isPrismaError(error)) {
        throw error;
      }

      if (error.code === 'P2002') {
        throw new ConflictException('Room already exists');
      }

      throw error;
    }
  }

  async findAll(userId: UserDto['id']): Promise<RoomDto[]> {
    const items = await this.prisma.room.findMany({
      where: {
        userId: userId,
      },
    });

    return this.mapToDtos(items);
  }

  mapToDto(room: Room): RoomDto {
    return plainToInstance(RoomDto, room, { excludeExtraneousValues: true });
  }

  mapToDtos(rooms: Room[]): RoomDto[] {
    return rooms.map((room) => this.mapToDto(room));
  }
}
