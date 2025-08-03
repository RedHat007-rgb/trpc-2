import { Module } from '@nestjs/common';
import { TodoRouter } from './todo.router';
import { TodoService } from './todo.service';

import { DbModule } from 'src/db/db.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [DbModule, RedisModule],
  providers: [TodoRouter, TodoService],
})
export class TodoModule {}
