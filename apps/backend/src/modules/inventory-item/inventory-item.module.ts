import { Module } from '@nestjs/common';
import { InventoryItemController } from './inventory-item.controller';
import { InventoryItemService } from './inventory-item.service';

@Module({
  imports: [],
  controllers: [InventoryItemController],
  providers: [InventoryItemService],
  exports: [InventoryItemService],
})
export class InventoryItemModule {}
