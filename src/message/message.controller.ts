import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Res,
    HttpStatus,
    UseGuards,
} from '@nestjs/common';
import { CreateMessageDto } from '@app/dto';
import { MessageService } from './message.service';
import { Response } from 'express';
import { IMessage } from '@app/interfaces';
import { AuthGuard } from '@nestjs/passport';

@Controller('messages')
export class messagesController {
    constructor(private readonly messagesService: MessageService) { }

    @Get(':userId')
    @UseGuards(AuthGuard())
    async getMessages(
        @Param('userId') userId: string,
        @Res() res: Response
    ): Promise<IMessage[]> {
        try {
            const messages: IMessage[] = await this.messagesService.getMessages(userId);
            res.status(HttpStatus.OK).json({
                message: 'messages',
                messages,
            });
            return messages;
        } catch (e) {
            console.log(e);
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getMessageById(
        @Param('id') id: string,
        @Res() res: Response
    ): Promise<IMessage> {
        try {
            const oneMessage: IMessage = await this.messagesService.getMessage(id);
            res.status(HttpStatus.OK).json({
                message: 'Message',
                oneMessage,
            });
            return oneMessage;
        } catch (e) {
            console.log(e);
        }
    }

    @Post('/:username')
    async sendMessage(
        @Param('username') username: string,
        @Body() messageDto: CreateMessageDto,
        @Res() res: Response,
    ): Promise<IMessage> {
        try {
            const newMessage: IMessage = await this.messagesService.sendMessage(
                username,
                messageDto,
            );
            res.status(HttpStatus.OK).json({
                message: 'New message',
                messages: newMessage,
            });
            return newMessage;
        } catch (e) {
            console.log(e);
        }
    }

    @Get('/total')
    async getTotalNumberOfMessages(@Res() res: Response): Promise<number> {
        try {
            const totalMessages: number = await this.messagesService.getTotalNumberOfMessages();
            res.status(HttpStatus.OK).json({
                message: 'Total number of messages',
                totalMessages,
            });
            return totalMessages;
        } catch (e) {
            console.log(e);
        }
    }
}