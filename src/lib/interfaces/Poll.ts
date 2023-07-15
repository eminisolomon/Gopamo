import { Document } from 'mongoose';

export interface IPoll extends Document {
    _id: string;
    name: string;
    question: string;
    options: { option: string; votes: number }[];
    duration: number;
    voters: string[];
    user: string;
}
