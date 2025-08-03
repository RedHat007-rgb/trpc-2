import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { TRPCModule } from 'nestjs-trpc';
import { RedisModule } from './redis/redis.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    TodoModule,
    DbModule,
    ConfigModule.forRoot(),
    TRPCModule.forRoot({
      autoSchemaFile: '../../packages/trpc-config/src/server',
    }),
    RedisModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
