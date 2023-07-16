import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PollSchema } from '@app/schemas';
import { AuthModule } from '@app/auth/auth.module';

@Module({
    imports: [
        AuthModule,
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
