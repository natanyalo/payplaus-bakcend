// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum TypeUse {
  User = 'User',
  Admin = 'Admin',
}
@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  age: number;

  @Prop({ required: true })
  role: TypeUse;
}

export const UserSchema = SchemaFactory.createForClass(User);
