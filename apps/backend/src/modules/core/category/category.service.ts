import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UserDto } from '../user/dto/user.dto';
import { Category, Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/client';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: UserDto['id']
  ): Promise<CategoryDto> {
    try {
      const categoryEntity = await this.prisma.category.create({
        data: {
          name: createCategoryDto.name,
          user: {
            connect: { id: userId },
          },
        },
      });

      return this.mapToDto(categoryEntity);
    } catch (error) {
      if (!this.prisma.isPrismaError(error)) {
        throw error;
      }

      if (error.code === 'P2002') {
        throw new ConflictException('Category already exists');
      }

      throw error;
    }
  }

  async findAll(userId: UserDto['id']): Promise<CategoryDto[]> {
    const items = await this.prisma.category.findMany({
      where: {
        userId: userId,
      },
    });

    return this.mapToDtos(items);
  }

  async findOne(
    query: Prisma.CategoryFindUniqueArgs<DefaultArgs>
  ): Promise<CategoryDto> {
    const categoryEntity = await this.prisma.category.findUnique(query);

    if (!categoryEntity) {
      throw new NotFoundException('Category not found');
    }

    return this.mapToDto(categoryEntity);
  }

  async findOneById(categoryId: CategoryDto['id'], userId: UserDto['id']) {
    return this.findOne({
      where: {
        id: categoryId,
        userId: userId,
      },
    });
  }

  async update(
    updateData: UpdateCategoryDto,
    userId: UserDto['id']
  ): Promise<CategoryDto> {
    try {
      const { id, ...data } = updateData;

      const categoryEntity = await this.prisma.category.update({
        where: {
          id: id,
          userId: userId,
        },
        data: data,
      });

      if (!categoryEntity) {
        throw new NotFoundException('Category not found');
      }

      return this.mapToDto(categoryEntity);
    } catch (error) {
      if (!this.prisma.isPrismaError(error)) {
        throw error;
      }

      // Handle specific Prisma errors

      throw error;
    }
  }

  async delete(categoryId: CategoryDto['id'], userId: UserDto['id']) {
    await this.findOneById(categoryId, userId);

    await this.prisma.category.delete({
      where: {
        id: categoryId,
        userId: userId,
      },
    });

    return;
  }

  mapToDto(category: Category): CategoryDto {
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  mapToDtos(categories: Category[]): CategoryDto[] {
    return categories.map((category) => this.mapToDto(category));
  }
}
