import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type todoDocument = HydratedDocument<TodoSchema>;

@Schema()
export class TodoSchema {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  done: false;
}

export const todoSchema = SchemaFactory.createForClass(TodoSchema);
