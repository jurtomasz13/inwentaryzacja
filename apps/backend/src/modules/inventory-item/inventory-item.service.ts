import { Injectable } from '@nestjs/common';
import { InventoryItemDto, InventoryItemId } from './dto/inventory-item.dto';
import { CreateStandaloneInventoryItemDto } from './dto/create-inventory-item.dto';
import { PrismaMapperBase } from '../../common/prisma-mapper.base';
import { InventoryItem, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserId } from '../user/types';
import { UpdateInventoryItemDto } from './dto/update-inventory-item.dto';
import { DefaultArgs } from '@prisma/client/runtime/binary';

@Injectable()
export class InventoryItemService extends PrismaMapperBase<
  InventoryItem,
  InventoryItemDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(InventoryItemDto);
  }

  async create(
    createInventoryItemDto: CreateStandaloneInventoryItemDto,
    userId: UserId
  ): Promise<InventoryItemDto> {
    const inventoryItemEntity = await this.prisma.inventoryItem.create({
      data: {
        quantity: createInventoryItemDto.quantity,
        product: {
          connect: { id: createInventoryItemDto.productId },
        },
        room: {
          connect: { id: createInventoryItemDto.roomId },
        },
        inventory: {
          connect: {
            id: createInventoryItemDto.inventoryId,
            userId: userId,
          },
        },
      },
    });

    return this.toDefaultDto(inventoryItemEntity);
  }

  async findAll(userId: UserId): Promise<InventoryItemDto[]> {
    const items = await this.prisma.inventoryItem.findMany({
      where: {
        inventory: {
          userId: userId,
        },
      },
    });

    return this.toDefaultDtos(items);
  }

  async findOne(
    query: Prisma.InventoryItemFindUniqueArgs<DefaultArgs>
  ): Promise<InventoryItemDto> {
    const inventoryItemEntity =
      await this.prisma.inventoryItem.findUniqueOrThrow(query);

    return this.toDefaultDto(inventoryItemEntity);
  }

  async findOneById(id: InventoryItemId, userId: UserId) {
    return this.findOne({
      where: {
        id: id,
        inventory: {
          userId: userId,
        },
      },
    });
  }

  async update(
    id: InventoryItemId,
    updateData: UpdateInventoryItemDto,
    userId: UserId
  ): Promise<InventoryItemDto> {
    const inventoryItemEntity = await this.prisma.inventoryItem.update({
      where: {
        id: id,
        inventory: {
          userId: userId,
        },
      },
      data: updateData,
    });

    return this.toDefaultDto(inventoryItemEntity);
  }

  async delete(id: InventoryItemId, userId: UserId) {
    await this.prisma.inventoryItem.delete({
      where: {
        id: id,
        inventory: {
          userId: userId,
        },
      },
    });

    return;
  }
}
