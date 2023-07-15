// poll.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePollDto } from '@app/dto';
import { IPoll } from '@app/interfaces';
import { Model } from 'mongoose';

@Injectable()
export class PollService {
  constructor(@InjectModel('Poll') private readonly pollModel: Model<IPoll>) {}

  async createPoll(pollDto: CreatePollDto): Promise<IPoll> {
    try {
      const newPoll: IPoll = new this.pollModel(pollDto);
      return await newPoll.save();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getPolls(): Promise<IPoll[]> {
    try {
      const polls: IPoll[] = await this.pollModel.find().exec();
      return polls;
    } catch (e) {
      console.log(e);
    }
  }

  async getPollById(pollId: string): Promise<IPoll> {
    try {
      const poll: IPoll = await this.pollModel.findById(pollId).exec();
      if (!poll) {
        throw new NotFoundException('Poll not found');
      }
      return poll;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getPollByName(pollName: string): Promise<IPoll> {
    try {
      const poll: IPoll = await this.pollModel.findOne({ name: pollName }).exec();
      if (!poll) {
        throw new NotFoundException('Poll not found');
      }
      return poll;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deletePoll(pollId: string): Promise<void> {
    try {
      const result = await this.pollModel.deleteOne({ _id: pollId }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('Poll not found');
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async vote(pollId: string, email: string, optionIndex: number): Promise<void> {
    try {
      const poll: IPoll = await this.getPollById(pollId);

      if (poll.voters.includes(email)) {
        throw new ConflictException('User has already voted');
      }

      if (optionIndex < 0 || optionIndex >= poll.options.length) {
        throw new NotFoundException('Option not found');
      }

      poll.options[optionIndex].votes++;
      poll.voters.push(email);

      await poll.save();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
