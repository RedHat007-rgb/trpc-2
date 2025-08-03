import { Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { RedisService } from 'src/redis/redis.service';
import { PrismaService } from './prisma.service';

@Injectable()
export class PrismaAction {
  private redisClient: RedisClientType;

  private lastId = '$';
  constructor(
    private readonly redisService: RedisService,
    private readonly prismaService: PrismaService,
  ) {}
  onModuleInit() {
    this.redisClient = this.redisService.getClient();
    this.listenToStream();
  }
  private async listenToStream() {
    console.log('inside listen to stream');
    console.log('Listening to Redis stream...');
    while (true) {
      try {
        const streams = await this.redisClient.xRead(
          {
            key: 'prisma',
            id: this.lastId,
          },
          {
            BLOCK: 5000,
            COUNT: 1,
          },
        );

        if (!streams) {
          continue;
        }
        console.log('inside before streams');

        for (const stream of streams) {
          console.log('in streams');
          for (const entry of stream.messages) {
            const { id, message: fields } = entry;
            this.lastId = id;
            const { title, description, done } = fields;

            try {
              await this.prismaService.todo.create({
                data: {
                  title: `${title}`,
                  description: `${description}`,
                  done: done === 'true',
                },
              });
            } catch (error) {
              throw new Error(`Prisma insert failed:, ${error}`);
            }
          }
        }
      } catch (err) {
        console.error(`Error in PrismaAction class: ${err}`);
      }
    }
  }
}
