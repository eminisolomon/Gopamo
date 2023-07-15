import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Poll extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  question: string;

  @Prop({ type: [{ option: String, votes: Number }] })
  options: { option: string; votes: number }[];

  @Prop({ required: true })
  duration: number;

  @Prop({ type: [String], default: [] })
  voters: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PollSchema = SchemaFactory.createForClass(Poll);
