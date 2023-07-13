import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from '@app/dto';
import { Message, User } from "@app/schemas";
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('message')
export class MessageController {
    constructor(private message: MessageService) { }

    @Get()
    @UseGuards(AuthGuard())
    async getMessages(@Query() query: ExpressQuery, @Req() req): Promise<Message[]> {
        return this.message.messages(query, req.user);
    }

    @Post(':username')
    async createMessage(
        @Body() message: CreateMessageDto,
        @Param('username') username: string,
    ): Promise<Message> {
        const recipientUser = await this.message.getUserByUsername(username);
        return this.message.create(message, recipientUser._id);
    }
}
