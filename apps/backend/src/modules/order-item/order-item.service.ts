import { Injectable } from '@nestjs/common';
import { OrderItem, Prisma } from '@prisma/client';
import { PrismaMapperBase } from '../../common/prisma-mapper.base';
import { PrismaService } from '../prisma/prisma.service';
import { OrderItemDto, OrderItemId } from './dto/order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { DefaultArgs } from '@prisma/client/runtime/binary';
import { CreateStandaloneOrderItemDto } from './dto/create-order-item.dto';
import type { UserId } from '../user/types';

@Injectable()
export class OrderItemService extends PrismaMapperBase<
  OrderItem,
  OrderItemDto
> {
  constructor(private readonly prisma: PrismaService) {
    super(OrderItemDto);
  }

  async create(
    createOrderItemDto: CreateStandaloneOrderItemDto,
    userId: UserId
  ): Promise<OrderItemDto> {
    const orderItemEntity = await this.prisma.orderItem.create({
      data: {
        quantity: createOrderItemDto.quantity,
        order: {
          connect: {
            id: createOrderItemDto.orderId,
            userId: userId,
          },
        },
        product: {
          connect: {
            id: createOrderItemDto.productId,
            userId: userId,
          },
        },
      },
    });

    return this.toDefaultDto(orderItemEntity);
  }

  async findAll(userId: UserId): Promise<OrderItemDto[]> {
    const items = await this.prisma.orderItem.findMany({
      where: {
        order: {
          userId: userId,
        },
      },
    });

    return this.toDefaultDtos(items);
  }

  async findOne(
    query: Prisma.OrderItemFindUniqueArgs<DefaultArgs>
  ): Promise<OrderItemDto> {
    const orderItemEntity = await this.prisma.orderItem.findUniqueOrThrow(
      query
    );

    return this.toDefaultDto(orderItemEntity);
  }

  async findOneById(id: OrderItemId, userId: UserId) {
    return this.findOne({
      where: {
        id: id,
        order: {
          userId: userId,
        },
      },
    });
  }

  async update(
    id: OrderItemId,
    updateData: UpdateOrderItemDto,
    userId: UserId
  ): Promise<OrderItemDto> {
    const orderItemEntity = await this.prisma.orderItem.update({
      where: {
        id: id,
        order: {
          userId: userId,
        },
      },
      data: updateData,
    });

    return this.toDefaultDto(orderItemEntity);
  }

  async delete(id: OrderItemId, userId: UserId) {
    await this.prisma.orderItem.delete({
      where: {
        id: id,
        order: {
          userId: userId,
        },
      },
    });

    return;
  }
}
