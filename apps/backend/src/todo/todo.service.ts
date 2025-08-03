import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { todoDocument } from 'src/db/Models/db.todo';
import { Todo } from './todo.zodSchema';

import { RedisService } from 'src/redis/redis.service';
import { generateDescription } from 'src/utils/description';
import { RedisClientType } from 'redis';

@Injectable()
export class TodoService {
  private redisClient: RedisClientType;
  constructor(
    @InjectModel('TodoSchema') private todoModel: Model<todoDocument>,
    private readonly redisService: RedisService,
  ) {}

  onModuleInit() {
    this.redisClient = this.redisService.getClient();
  }

  async getAllTodo(): Promise<Todo[]> {
    const data = await this.todoModel.find({});
    const result = data.map((todo) => ({
      _id: todo._id.toString(),
      title: todo.title,
      description: todo.description,
      done: todo.done,
    }));
    return result;
  }

  async createTodo(input: Todo): Promise<Todo> {
    const { title, done } = input;

    try {
      const llmdescription = await generateDescription(title);
      console.log(llmdescription);
      const newTodo = {
        title,
        description: llmdescription,
        done,
      };
      console.log(llmdescription);
      const data = await this.todoModel.create(newTodo);
      const redisAdd = await this.redisClient.xAdd('prisma', '*', {
        title,
        description: llmdescription,
        done: done.toString(),
      });
      console.log(redisAdd);
      return {
        _id: data._id.toString(),
        title: data.title,
        description: data.description,
        done: data.done,
      };
    } catch (error) {
      console.log(error);
      throw new Error(`error in createTodo:${error}`);
    }
  }
}
