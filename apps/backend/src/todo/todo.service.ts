import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { todoDocument } from 'src/db/Models/db.todo';
import { Todo } from './todo.zodSchema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('TodoSchema') private todoModel: Model<todoDocument>,
  ) {}

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

  async createTodo(input): Promise<Todo> {
    const data = await this.todoModel.create(input);
    const result = {
      _id: data._id.toString(),
      title: data.title,
      description: data.description,
      done: data.done,
    };
    return result;
  }

  // async updateTodo(input): Promise<Todo> {
  //   const {_id,}
  //   const data = await this.todoModel.findByIdAndUpdate(input._id, input);
  //   return data;
  // }
}
