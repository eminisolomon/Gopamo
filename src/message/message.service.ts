import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Message } from "@app/schemas";
import { User } from "@app/schemas"
import { Query } from 'express-serve-static-core';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name)
        private messageModel: mongoose.Model<Message>,
    ) { }

    async create(message: Message, user: User): Promise<Message> {
        const data = Object.assign(message, { user: user._id });

        const savedMessage = await this.messageModel.create(data);
        return savedMessage;
    }
}