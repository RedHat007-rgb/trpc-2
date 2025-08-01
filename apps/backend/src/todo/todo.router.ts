import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import { TodoService } from './todo.service';
import { Todo, zTodo } from './todo.zodSchema';

@Router()
export class TodoRouter {
  constructor(private readonly todoService: TodoService) {}
  @Query()
  getAllTodo(): Promise<Todo[]> {
    return this.todoService.getAllTodo();
  }
  @Mutation({ input: zTodo, output: zTodo })
  createTodo(@Input() input): Promise<Todo> {
    return this.todoService.createTodo(input);
  }
  @Mutation()
  updateTodo(@Input() input): Promise<Todo> {
    return this.todoService.updateTodo(input);
  }
}
