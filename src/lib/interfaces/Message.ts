import { Document } from 'mongoose';

export interface IMessage extends Document {
  _id: string;
  user: string;
  message: string;
  date?: Date;
}