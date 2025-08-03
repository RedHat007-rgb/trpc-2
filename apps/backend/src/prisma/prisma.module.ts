import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';

import { PrismaAction } from './prisma.actions';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [RedisModule],
  providers: [PrismaAction, PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
