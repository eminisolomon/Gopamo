import { IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';

export class CreatePollDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly question: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    readonly options: { option: string; votes: number }[];
}
