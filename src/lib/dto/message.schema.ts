import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import * as dateAndTime from 'date-and-time';
import { User } from "./user.schema";

@Schema()
export class Message extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ required: true })
  text: string;

  @Prop({ default: dateAndTime.format(new Date(), 'hh:mm:ss A, MM-DD-YYYY') })
  date: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
