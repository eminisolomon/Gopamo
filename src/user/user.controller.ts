import {
    Controller,
    Delete,
    Get,
    Param,
    Put,
    Body,
    Res,
    HttpStatus,
} from '@nestjs/common';
import { UpdateUserDto } from '@app/dto';
import { UsersService } from './user.service';
import { Response } from 'express';
import { IUser } from '@app/interfaces';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getUsers(@Res() res: Response): Promise<IUser[]> {
        try {
            const users: IUser[] = await this.usersService.getUsers();
            res.status(HttpStatus.OK).json({
                message: 'Users',
                users,
            });
            return users;
        } catch (e) {
            console.log(e);
        }
    }

    @Get(':id')
    async getUser(@Param('id') id: 'id', @Res() res: Response): Promise<IUser> {
        try {
            const user: IUser = await this.usersService.getUser(id);
            res.status(HttpStatus.OK).json({
                message: 'User',
                user,
            });
            return user;
        } catch (e) {
            console.log(e);
        }
    }

    @Put(':id')
    async updateUser(
        @Param('id') id: string,
        @Body() userDto: UpdateUserDto,
        @Res() res: Response,
    ): Promise<IUser> {
        try {
            const updateUser: IUser = await this.usersService.updateUser(id, userDto);
            res.status(HttpStatus.OK).json({
                message: 'Update user',
                user: updateUser,
            });
            return updateUser;
        } catch (e) {
            console.log(e);
        }
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') id: string,
        @Res() res: Response,
    ): Promise<IUser> {
        try {
            const deleteUser: IUser = await this.usersService.deleteUser(id);
            res.status(HttpStatus.OK).json({
                message: 'Update user',
                user: deleteUser,
            });
            return deleteUser;
        } catch (e) {
            console.log(e);
        }
    }

    @Get(':username')
    async getUsername(@Param('username') username: 'username', @Res() res: Response): Promise<IUser> {
        try {
            const user: IUser = await this.usersService.findOne(username);
            res.status(HttpStatus.OK).json({
                message: 'User',
                user,
            });
            return user;
        } catch (e) {
            console.log(e);
        }
    }
}