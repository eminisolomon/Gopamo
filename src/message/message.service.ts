import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Message } from '@app/schemas';
import { User } from '@app/schemas';
import { Query } from 'express-serve-static-core';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name)
        private messageModel: mongoose.Model<Message>,
    ) { }

    async create(message: Message, user: User): Promise<Message> {
        if (!message.message) {
            throw new BadRequestException('Message is required');
        }

        const data = Object.assign(message, { user: user._id });

        const savedMessage = await this.messageModel.create(data);
        return savedMessage;
    }

    async messages(query: Query, user: User): Promise<Message[]> {
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        const keyword = query.keyword
            ? {
                text: {
                    $regex: query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const messages = await this.messageModel
            .find({ user: user._id, ...keyword })
            .limit(resPerPage)
            .skip(skip);
        return messages;
    }

}
