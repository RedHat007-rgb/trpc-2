import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserSchema>;
@Schema()
export class UserSchema {
  @Prop()
  name: string;

  @Prop()
  email: string;
  @Prop()
  mobile: string;
}

export const userSchema = SchemaFactory.createForClass(UserSchema);
