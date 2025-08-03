import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  async onModuleInit() {
    this.client = createClient({
      url: 'redis://localhost:6379',
    });
    this.client.on('error', (error) => {
      console.log(error);
      throw new Error(`redis error :${error}`);
    });
    await this.client.connect();
    console.log('Redis connected.....');
  }
  async onModuleDestroy() {
    await this.client.quit();
  }
  getClient(): RedisClientType {
    if (!this.client) {
      throw new Error('Redis client is not instalized yet');
    }
    return this.client;
  }
}
