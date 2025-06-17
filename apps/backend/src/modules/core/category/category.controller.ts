import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../../../decorators/user.decorator';
import { UserDto } from '../user/dto/user.dto';

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll(@User() user: UserDto) {
    return this.categoryService.findAll(user.id);
  }

  @Get(':id')
  get(@User() user: UserDto, @Param('id') id: string) {
    return this.categoryService.findOneById(id, user.id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @User() user: UserDto) {
    return this.categoryService.create(createCategoryDto, user.id);
  }

  @Patch()
  update(@Body() updateCategoryDto: UpdateCategoryDto, @User() user: UserDto) {
    return this.categoryService.update(updateCategoryDto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @User() user: UserDto) {
    console.log('Deleting category with ID:', id);
    return this.categoryService.delete(id, user.id);
  }
}
