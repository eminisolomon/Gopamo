import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { messagesController } from './message.controller';
import { MessageSchema } from '@app/schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'products',
        schema: MessageSchema,
      },
    ]),
  ],
  providers: [MessageService],
  controllers: [messagesController],
})
export class ProductsModule { }