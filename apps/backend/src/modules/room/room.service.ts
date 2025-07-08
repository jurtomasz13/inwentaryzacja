import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Room } from '@prisma/client';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomDto } from './dto/room.dto';
import { DefaultArgs } from '@prisma/client/runtime/client';
import { UpdateRoomDto } from './dto/update-room.dto';
import { UserId } from '../user/types';
import { RoomId } from './types';
import { PrismaMapperBase } from '../../common/prisma-mapper.base';

@Injectable()
export class RoomService extends PrismaMapperBase<Room, RoomDto> {
  constructor(private readonly prisma: PrismaService) {
    super(RoomDto);
  }

  async create(CreateRoomDto: CreateRoomDto, userId: UserId): Promise<RoomDto> {
    const roomEntity = await this.prisma.room.create({
      data: {
        name: CreateRoomDto.name,
        user: {
          connect: { id: userId },
        },
      },
    });

    return this.toDefaultDto(roomEntity);
  }

  async findAll(userId: UserId): Promise<RoomDto[]> {
    const items = await this.prisma.room.findMany({
      where: {
        userId: userId,
      },
    });

    return this.toDefaultDtos(items);
  }

  async findOne(
    query: Prisma.RoomFindUniqueArgs<DefaultArgs>
  ): Promise<RoomDto> {
    const roomEntity = await this.prisma.room.findUniqueOrThrow(query);
    return this.toDefaultDto(roomEntity);
  }

  async findOneById(id: RoomId, userId: UserId) {
    return this.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
  }

  async update(
    id: RoomId,
    updateData: UpdateRoomDto,
    userId: UserId
  ): Promise<RoomDto> {
    const roomEntity = await this.prisma.room.update({
      where: {
        id: id,
        userId: userId,
      },
      data: updateData,
    });

    return this.toDefaultDto(roomEntity);
  }

  async delete(id: RoomId, userId: UserId) {
    await this.prisma.room.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return;
  }
}
