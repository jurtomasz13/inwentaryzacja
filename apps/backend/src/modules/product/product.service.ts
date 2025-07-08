import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDto } from './dto/product.dto';
import { UserId } from '../user/types';
import { ProductId } from './types';
import { PrismaMapperBase } from '../../common/prisma-mapper.base';

@Injectable()
export class ProductService extends PrismaMapperBase<Product, ProductDto> {
  constructor(private readonly prisma: PrismaService) {
    super(ProductDto);
  }

  async create(
    createProductDto: CreateProductDto,
    userId: UserId
  ): Promise<ProductDto> {
    const productEntity = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        code: createProductDto.code,
        unit: createProductDto.unit,
        user: {
          connect: { id: userId },
        },
        category: {
          connect: {
            id: createProductDto.categoryId,
          },
        },
      },
    });

    return this.toDefaultDto(productEntity);
  }

  async findAll(userId: UserId): Promise<ProductDto[]> {
    const items = await this.prisma.product.findMany({
      where: {
        userId: userId,
      },
    });

    return this.toDefaultDtos(items);
  }

  async findOne(
    query: Prisma.ProductFindUniqueArgs<DefaultArgs>
  ): Promise<ProductDto> {
    const productEntity = await this.prisma.product.findUniqueOrThrow(query);
    return this.toDefaultDto(productEntity);
  }

  async findOneById(id: ProductId, userId: UserId) {
    return this.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
  }

  async update(
    id: ProductId,
    updateData: UpdateProductDto,
    userId: UserId
  ): Promise<ProductDto> {
    const productEntity = await this.prisma.product.update({
      where: {
        id: id,
        userId: userId,
      },
      data: updateData,
    });

    return this.toDefaultDto(productEntity);
  }

  async delete(id: ProductId, userId: UserId) {
    await this.prisma.product.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return;
  }
}
