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
import { OrderItemService } from './order-item.service';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../../decorators/user.decorator';
import { CreateStandaloneOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import type { OrderItemId } from './dto/order-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Get()
  getAll(@User() user: UserDto) {
    return this.orderItemService.findAll(user.id);
  }

  @Get(':id')
  get(@Param('id') id: OrderItemId, @User() user: UserDto) {
    return this.orderItemService.findOneById(id, user.id);
  }

  @Post()
  create(
    @Body() createInventoryItemDto: CreateStandaloneOrderItemDto,
    @User() user: UserDto
  ) {
    return this.orderItemService.create(createInventoryItemDto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: OrderItemId,
    @Body() updateInventoryItemDto: UpdateOrderItemDto,
    @User() user: UserDto
  ) {
    return this.orderItemService.update(id, updateInventoryItemDto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: OrderItemId, @User() user: UserDto) {
    return this.orderItemService.delete(id, user.id);
  }
}
