import {
    IsEmpty,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { User } from '@app/schemas';
import { Message as BaseMessage } from '@app/schemas';

export class CreateMessageDto extends BaseMessage {
    @IsNotEmpty()
    @IsString()
    readonly message: string;

    @IsEmpty({ message: 'You cannot pass user id' })
    readonly user: User;
}
