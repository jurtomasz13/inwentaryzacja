import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { plainToInstance } from 'class-transformer';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UserDto } from '../user/dto/user.dto';
import { Category } from '@prisma/client';

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

  mapToDto(category: Category): CategoryDto {
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  mapToDtos(categories: Category[]): CategoryDto[] {
    return categories.map((category) => this.mapToDto(category));
  }
}
