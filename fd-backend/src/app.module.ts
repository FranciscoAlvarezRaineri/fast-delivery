import { Module } from '@nestjs/common';
import ConfigModule from './enviroment/env.config';
import { RoutesModule } from './modules/routes.module';

@Module({
  imports: [ConfigModule, RoutesModule],
})
export class AppModule {}
