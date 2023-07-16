import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { messagesController } from './message.controller';
import { MessageSchema, UserSchema } from '@app/schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@app/auth/auth.module';
import { UsersModule } from '@app/user/user.module';
import { UsersService } from '@app/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'messages',
        schema: MessageSchema,
      },
      {
        name: 'users',
        schema: UserSchema,
      },
    ]),
    UsersModule,
    AuthModule,
  ],
  providers: [MessageService, UsersService],
  controllers: [messagesController],
})
export class MessageModule {}