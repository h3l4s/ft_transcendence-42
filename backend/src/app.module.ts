import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthModuleOptions } from '@nestjs/passport';
import { UsersModule } from './users/users.module';
import { AppGateway } from './app.gateway';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
@Module({
  imports: [AuthModule,UsersModule,AuthModuleOptions,ConfigModule.forRoot(),TypeOrmModule.forRoot(config)],
  controllers: [AppController],
  providers: [AppService,AuthModuleOptions,AppGateway],
})
export class AppModule {}
