import {
    Controller,
    Post,
    Get,
    Param,
    Delete,
    Body,
    Res,
    HttpStatus,
    UseGuards
} from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto } from '@app/dto';
import { IPoll } from '@app/interfaces';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('polls')
export class PollController {
    constructor(private readonly pollService: PollService) { }

    @Post(':userId')
    @UseGuards(AuthGuard())
    async createPoll(
        @Param('userId') userId: string,
        @Body() pollDto: CreatePollDto,
        @Res() res: Response,
    ): Promise<IPoll> {
        try {
            const newPoll: IPoll = await this.pollService.createPoll(userId, pollDto);
            res.status(HttpStatus.OK).json({
                message: 'Poll created',
                poll: newPoll,
            });
            return newPoll;
        } catch (e) {
            console.log(e);
        }
    }

    @Get(':userId')
    @UseGuards(AuthGuard())
    async getUserPolls(@Param('userId') userId: string, @Res() res: Response): Promise<IPoll[]> {
        try {
            const polls: IPoll[] = await this.pollService.getUserPolls(userId);
            res.status(HttpStatus.OK).json({
                message: 'User polls',
                polls,
            });
            return polls;
        } catch (e) {
            console.log(e);
        }
    }

    @Get()
    async getPolls(@Res() res: Response): Promise<IPoll[]> {
        try {
            const polls: IPoll[] = await this.pollService.getPolls();
            res.status(HttpStatus.OK).json({
                message: 'Polls',
                polls,
            });
            return polls;
        } catch (e) {
            console.log(e);
        }
    }

    @Get(':id')
    async getPollById(@Param('id') id: string, @Res() res: Response): Promise<IPoll> {
        try {
            const poll: IPoll = await this.pollService.getPollById(id);
            res.status(HttpStatus.OK).json({
                message: 'Poll',
                poll,
            });
            return poll;
        } catch (e) {
            console.log(e);
        }
    }

    @Delete(':id')
    async deletePoll(@Param('id') id: string, @Res() res: Response): Promise<void> {
        try {
            await this.pollService.deletePoll(id);
            res.status(HttpStatus.OK).json({
                message: 'Poll deleted',
            });
        } catch (e) {
            console.log(e);
        }
    }
}
