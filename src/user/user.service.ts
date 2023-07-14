import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '@app/interfaces';
import { UpdateUserDto } from '@app/dto';
import { Model } from 'mongoose';

export type User = any;

@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private readonly userModel: Model<IUser>) { }

    async getUsers(): Promise<IUser[]> {
        try {
            const users: IUser[] = await this.userModel.find();
            return users;
        } catch (e) {
            console.log(e);
        }
    }

    async getUser(id: string): Promise<IUser> {
        try {
            const user: IUser = await this.userModel.findById(id);
            if (!user) {
                throw new NotFoundException(`The user with ${id} not found`);
            }
            return user;
        } catch (e) {
            console.log(e);
        }
    }

    async updateUser(id: string, userDto: UpdateUserDto): Promise<IUser> {
        try {
            const updateUser: IUser = await this.userModel.findByIdAndUpdate(
                id,
                userDto,
                {
                    new: true,
                },
            );
            if (!updateUser) {
                throw new NotFoundException(`The user with ${id} not found`);
            }
            return await updateUser.save();
        } catch (e) {
            console.log(e);
        }
    }

    async deleteUser(id: string): Promise<IUser> {
        try {
            const deleteUser: IUser = await this.userModel.findByIdAndDelete(id);
            if (!deleteUser) {
                throw new NotFoundException(`The user with ${id} not found`);
            }
            return deleteUser;
        } catch (e) {
            console.log(e);
        }
    }

    async findOne(username: string): Promise<IUser> {
        try {
            const findUser: IUser = await this.userModel.findOne({
                username: `${username}`,
            });
            if (!findUser) {
                throw new NotFoundException(`The user with ${username} not found`);
            }
            return findUser;
        } catch (e) {
            console.log(e);
        }
    }
}