import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import * as mongoose from 'mongoose';

import { Poll, PollDocument } from './poll.schema';
import { Answer, AnswerDocument } from 'src/answers/answer.schema';
import { Vote, VoteDocument } from 'src/votes/vote.schema';

import { NotFoundException } from '@nestjs/common';


@Injectable()
export class PollsService {
  constructor(
    @InjectModel(Poll.name) private pollModel: Model<PollDocument>,
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(Vote.name) private voteModel: Model<VoteDocument>,
    @InjectConnection() private readonly connection: mongoose.Connection
  ) { }

  async create(createPollDto: CreatePollDto) {
    const createdPoll = new this.pollModel(createPollDto);
    await createdPoll.populate('answers');
    return createdPoll.save();
  }

  async findAll(): Promise<Poll[]> {
    return this.pollModel
      .find()
      .populate('answers')
      .exec();

    //return `This action returns all polls`;
  }

  /*
  async findAll() : Promise<Poll[]> {
    return this.pollModel.aggregate([
                {
                    '$lookup': {
                        'from': 'anwers', 
                        'localField': '_id', 
                        'foreignField': 'poll', 
                        'as': 'answers'
                    }
                }
            ])
            .exec();

               .aggregate([
                // Stage 1: Filter pizza order documents by pizza size
                {
                   $match: { size: "medium" }
                },
                // Stage 2: Group remaining documents by pizza name and calculate total quantity
                {
                   $group: { _id: "$name", totalQuantity: { $sum: "$quantity" } }
                }
             ]);

  //return `This action returns all polls`;
  }
  */

  async findOne(id: string): Promise<Poll> {
    const poll = await this.pollModel
      .findById(id)
      .populate('answers');

    if (!poll) {
      throw new NotFoundException();
    }

    return poll;
  }

  async update(id: string, updatePollDto: UpdatePollDto) {
    const poll = await this.pollModel
      .findByIdAndUpdate(id, updatePollDto)
      .setOptions({ overwrite: true, new: true });
    if (!poll) {
      throw new NotFoundException();
    }
    return poll;
  }

  async remove(id: string) {
    const session = await this.connection.startSession();

    session.startTransaction();

    try {

      // delete poll
      const poll = await this.pollModel
        .findByIdAndDelete(id)
        .session(session);

      if (!poll) {
        throw new NotFoundException();
      }

      // delete related answers in this poll
      const filters = {};
      filters['pollId'] = poll._id;

      await this.answerModel
        .deleteMany(filters)
        .session(session);


      // delete related votes records
      const votes = await this.voteModel
        .deleteMany(filters)
        .session(session);

      await session.commitTransaction();     
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  /*
  update(id: number, updatePollDto: UpdatePollDto) {
    return `This action updates a #${id} poll`;
  }

  remove(id: number) {
    return `This action removes a #${id} poll`;
  }
  */

}
