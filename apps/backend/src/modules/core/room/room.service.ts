import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Room } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../user/dto/user.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomDto } from './dto/room.dto';
import { DefaultArgs } from '@prisma/client/runtime/client';
import { UpdateRoomDto } from './dto/update-room.dto';

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

  async findOne(
    query: Prisma.RoomFindUniqueArgs<DefaultArgs>
  ): Promise<RoomDto> {
    const roomEntity = await this.prisma.room.findUnique(query);

    if (!roomEntity) {
      throw new NotFoundException('Room not found');
    }

    return this.mapToDto(roomEntity);
  }

  async findOneById(roomId: RoomDto['id'], userId: UserDto['id']) {
    return this.findOne({
      where: {
        id: roomId,
        userId: userId,
      },
    });
  }

  async update(
    updateData: UpdateRoomDto,
    userId: UserDto['id']
  ): Promise<RoomDto> {
    try {
      const { id, ...data } = updateData;

      const roomEntity = await this.prisma.room.update({
        where: {
          id: id,
          userId: userId,
        },
        data: data,
      });

      if (!roomEntity) {
        throw new NotFoundException('Room not found');
      }

      return this.mapToDto(roomEntity);
    } catch (error) {
      if (!this.prisma.isPrismaError(error)) {
        throw error;
      }

      // Handle specific Prisma errors

      throw error;
    }
  }

  async delete(roomId: RoomDto['id'], userId: UserDto['id']) {
    await this.findOneById(roomId, userId);

    await this.prisma.room.delete({
      where: {
        id: roomId,
        userId: userId,
      },
    });

    return;
  }

  mapToDto(room: Room): RoomDto {
    return plainToInstance(RoomDto, room, { excludeExtraneousValues: true });
  }

  mapToDtos(rooms: Room[]): RoomDto[] {
    return rooms.map((room) => this.mapToDto(room));
  }
}
