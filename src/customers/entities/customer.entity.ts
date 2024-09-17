import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {

  @Prop({ required: true })
  name:string;
  @Prop({ required: true })
  phone:string
  @Prop({ required: true, unique: true })
  email:string;
  @Prop({ required: true })
  birthday:string
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);