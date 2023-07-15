import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMessageDto } from '@app/dto';
import { IMessage, IUser } from '@app/interfaces';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
    constructor(
        @InjectModel('messages') private readonly messageModel: Model<IMessage>,
        @InjectModel('users') private readonly userModel: Model<IUser>,
    ) { }

    async getMessages(): Promise<IMessage[]> {
        try {
            const messages: IMessage[] = await this.messageModel.find();
            return messages;
        } catch (e) {
            console.log(e);
        }
    }

    async getMessage(messageId: string): Promise<IMessage> {
        try {
            const message: IMessage = await this.messageModel.findById(messageId);
            if (!message) {
                throw new NotFoundException(`Message with ID '${messageId}' not found`);
            }
            return message;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async sendMessage(username: string, messageDto: CreateMessageDto): Promise<IMessage> {
        try {
            const user: IUser = await this.userModel.findOne({ username });
            if (!user) {
                throw new NotFoundException(`User with username '${username}' not found`);
            }

            const newMessage: IMessage = new this.messageModel({ ...messageDto, user: user._id });
            return await newMessage.save();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getTotalNumberOfMessages(): Promise<number> {
        try {
            const totalMessages: number = await this.messageModel.countDocuments();
            return totalMessages;
        } catch (e) {
            console.log(e);
        }
    }
}
