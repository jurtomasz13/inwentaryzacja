import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../../decorators/user.decorator';
import { UserDto } from '../user/dto/user.dto';
import type { CategoryId } from './types';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(@User() user: UserDto) {
    return this.categoryService.findAll(user.id);
  }

  @Get(':id')
  get(@Param('id') id: CategoryId, @User() user: UserDto) {
    return this.categoryService.findOneById(id, user.id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @User() user: UserDto) {
    return this.categoryService.create(createCategoryDto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: CategoryId,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user: UserDto
  ) {
    return this.categoryService.update(id, updateCategoryDto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: CategoryId, @User() user: UserDto) {
    return this.categoryService.delete(id, user.id);
  }
}
