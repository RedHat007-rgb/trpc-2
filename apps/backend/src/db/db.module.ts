import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { todoSchema, TodoSchema } from './Models/db.todo';
import { userSchema, UserSchema } from './Models/db.user';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL') ?? '',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: TodoSchema.name, schema: todoSchema },
      { name: UserSchema.name, schema: userSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DbModule {}
