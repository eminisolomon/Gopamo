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
import { CreateMessageDto } from '@app/dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel(Message.name)
        private messageModel: mongoose.Model<Message>,
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
    ) { }

    async create(message: CreateMessageDto, recipientUserId: string): Promise<Message> {
        if (!message.message) {
            throw new BadRequestException('Message is required');
        }

        const data: Message = Object.assign(message, { user: recipientUserId });

        const savedMessage = await this.messageModel.create(data);
        return savedMessage;
    }

    async getUserByUsername(username: string): Promise<User> {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
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
