import { Module } from '@nestjs/common';
import { AuthModule } from '../modules/core/auth/auth.module';
import { UserModule } from '../modules/core/user/user.module';
import { PrismaModule } from '../modules/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
