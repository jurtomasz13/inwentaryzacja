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
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ProductService } from './product.service';
import { User } from '../../decorators/user.decorator';
import { UserDto } from '../user/dto/user.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { ProductId } from './types';

@UseGuards(JwtAuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(@User() user: UserDto) {
    return this.productService.findAll(user.id);
  }

  @Get(':id')
  get(@Param('id') id: ProductId, @User() user: UserDto) {
    return this.productService.findOneById(id, user.id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto, @User() user: UserDto) {
    return this.productService.create(createProductDto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ProductId,
    @Body() updateProductDto: UpdateProductDto,
    @User() user: UserDto
  ) {
    return this.productService.update(id, updateProductDto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: ProductId, @User() user: UserDto) {
    return this.productService.delete(id, user.id);
  }
}
