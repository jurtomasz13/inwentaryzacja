import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CategoryModule } from './modules/category/category.module';
import { RoomModule } from './modules/room/room.module';
import { ProductModule } from './modules/product/product.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { TestModule } from './modules/test/test.module';
import { InventoryItemModule } from './modules/inventory-item/inventory-item.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    CategoryModule,
    RoomModule,
    ProductModule,
    InventoryModule,
    InventoryItemModule,
    OrderModule,
    OrderItemModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
