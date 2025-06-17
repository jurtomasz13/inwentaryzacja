import { Module } from '@nestjs/common';
import { AuthModule } from './modules/core/auth/auth.module';
import { UserModule } from './modules/core/user/user.module';
import { PrismaModule } from './modules/core/prisma/prisma.module';
import { CategoryModule } from './modules/core/category/category.module';
import { RoomModule } from './modules/core/room/room.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, CategoryModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
