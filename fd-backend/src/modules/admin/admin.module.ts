import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthGuard } from '../../common/guards/auth.guard';
import { AuthService } from '../../common/firebase/auth.service';
import { Admin, AdminSchema } from './entities/admin.entity';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AdminRepository } from './repository/admin.repository';
import { CurrentAdminInterceptor } from './interceptors/current-admin.interceptor';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    AuthService,
    AdminRepository,
    CurrentAdminInterceptor,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AdminGuard,
    },
  ],
})
export class AdminModule {}
