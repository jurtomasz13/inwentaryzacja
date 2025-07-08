import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, Prisma } from '@prisma/client';
import { OrderDto, OrderId } from './dto/order.dto';
import { PrismaMapperBase } from '../../common/prisma-mapper.base';
import type { UserId } from '../user/types';
import { CreateOrderDto } from './dto/create-order.dto';
import { DefaultArgs } from '@prisma/client/runtime/binary';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService extends PrismaMapperBase<Order, OrderDto> {
  constructor(private readonly prisma: PrismaService) {
    super(OrderDto);
  }

  async create(
    createOrderDto: CreateOrderDto,
    userId: UserId
  ): Promise<OrderDto> {
    const orderEntity = await this.prisma.order.create({
      data: {
        name: createOrderDto.name,
        user: {
          connect: { id: userId },
        },
        inventory: {
          connect: {
            id: createOrderDto.inventoryId,
            userId: userId,
          },
        },
        orderItems: {
          createMany: {
            data: createOrderDto.orderItems,
          },
        },
      },
    });

    return this.toDefaultDto(orderEntity);
  }

  async findAll(userId: UserId): Promise<OrderDto[]> {
    const items = await this.prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderItems: true,
      },
    });

    return this.toDefaultDtos(items);
  }

  async findOne(
    query: Prisma.OrderFindUniqueArgs<DefaultArgs>
  ): Promise<OrderDto> {
    const orderEntity = await this.prisma.order.findUniqueOrThrow(query);

    return this.toDefaultDto(orderEntity);
  }

  async findOneById(id: OrderId, userId: UserId) {
    return this.findOne({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        orderItems: true,
      },
    });
  }

  async update(
    id: OrderId,
    updateData: UpdateOrderDto,
    userId: UserId
  ): Promise<OrderDto> {
    const orderEntity = await this.prisma.order.update({
      where: {
        id: id,
        userId: userId,
      },
      data: {
        name: updateData.name,
        orderItems: {
          updateMany: updateData.orderItems.map((item) => ({
            where: {
              id: item.id,
            },
            data: item,
          })),
        },
      },
    });

    return this.toDefaultDto(orderEntity);
  }

  async delete(id: OrderId, userId: UserId) {
    await this.prisma.order.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return;
  }
}
