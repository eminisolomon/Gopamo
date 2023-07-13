import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageSchema } from '@app/schemas';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class BookModule {}
