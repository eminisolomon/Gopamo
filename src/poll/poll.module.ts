import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PollSchema } from '@app/schemas';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Poll',
                schema: PollSchema,
            },
        ]),
    ],
    providers: [PollService],
    controllers: [PollController],
})
export class PollModule { }
