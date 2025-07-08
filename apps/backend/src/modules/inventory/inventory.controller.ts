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
import { InventoryService } from './inventory.service';
import { User } from '../../decorators/user.decorator';
import { UserDto } from '../user/dto/user.dto';
import type { InventoryId } from './dto/inventory.dto';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@UseGuards(JwtAuthGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getAll(@User() user: UserDto) {
    return this.inventoryService.findAll(user.id);
  }

  @Get(':id')
  get(@Param('id') id: InventoryId, @User() user: UserDto) {
    return this.inventoryService.findOneById(id, user.id);
  }

  @Post()
  create(
    @Body() createInventoryDto: CreateInventoryDto,
    @User() user: UserDto
  ) {
    return this.inventoryService.create(createInventoryDto, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: InventoryId,
    @Body() updateInventoryDto: UpdateInventoryDto,
    @User() user: UserDto
  ) {
    return this.inventoryService.update(id, updateInventoryDto, user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: InventoryId, @User() user: UserDto) {
    return this.inventoryService.delete(id, user.id);
  }
}
