import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
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

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @User() user: UserDto) {
    return this.categoryService.create(createCategoryDto, user.id);
  }

  // @Get(':id')
  // get(@User() user: UserDto, @Body('id') id: string) {
  //   return this.categoryService.findOne(id, user.id);
  // }
}
