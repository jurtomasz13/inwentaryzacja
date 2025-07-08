import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/client';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UserId } from '../user/types';
import { CategoryId } from './types';
import { PrismaMapperBase } from '../../common/prisma-mapper.base';

@Injectable()
export class CategoryService extends PrismaMapperBase<Category, CategoryDto> {
  constructor(private readonly prisma: PrismaService) {
    super(CategoryDto);
  }

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: UserId
  ): Promise<CategoryDto> {
    const categoryEntity = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        user: {
          connect: { id: userId },
        },
      },
    });

    return this.toDefaultDto(categoryEntity);
  }

  async findAll(userId: UserId): Promise<CategoryDto[]> {
    const items = await this.prisma.category.findMany({
      where: {
        userId: userId,
      },
    });

    return this.toDefaultDtos(items);
  }

  async findOne(
    query: Prisma.CategoryFindUniqueArgs<DefaultArgs>
  ): Promise<CategoryDto> {
    const categoryEntity = await this.prisma.category.findUniqueOrThrow(query);

    return this.toDefaultDto(categoryEntity);
  }

  async findOneById(id: CategoryId, userId: UserId) {
    return this.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
  }

  async update(
    id: CategoryId,
    updateData: UpdateCategoryDto,
    userId: UserId
  ): Promise<CategoryDto> {
    const categoryEntity = await this.prisma.category.update({
      where: {
        id: id,
        userId: userId,
      },
      data: updateData,
    });

    return this.toDefaultDto(categoryEntity);
  }

  async delete(id: CategoryId, userId: UserId) {
    await this.prisma.category.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    return;
  }
}
