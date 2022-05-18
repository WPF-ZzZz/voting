import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Poll, PollDocument } from 'src/schemas/poll.schema';
//import { Answer, AnswerDocument } from 'src/schemas/answer.schema';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import * as mongoose from 'mongoose';

import { NotFoundException } from '@nestjs/common';
//import { AnswersService } from 'src/answers/answers.service';



@Injectable()
export class PollsService {
  constructor(
      @InjectModel(Poll.name) private pollModel: Model<PollDocument>,
      //private readonly answersService: AnswersService,
     // @InjectConnection() private readonly connection: mongoose.Connection,
              //@InjectModel(Answer.name) private asnwerModel: Model<AnswerDocument>,
  ) {}

  /*
  async create(createPollDto: CreatePollDto) : Promise<Poll> {
    const createdPoll = new this.pollModel(createPollDto);
    await createdPoll.populate({
          path: 'answers',
      })
      .execPopulate();
    return createdPoll.save();

    // return 'This action adds a new poll';
  }
  */

  async create(createPollDto: CreatePollDto) {
    const createdPoll = new this.pollModel(createPollDto);
    await createdPoll.populate('answers');
    return createdPoll.save();
  }

  async findAll() : Promise<Poll[]> {
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

  async findOne(id: string) : Promise<Poll> {
      const poll = await this.pollModel
                             .findById(id)
                             .populate('answers');
  
    if (!poll) {
      throw new NotFoundException();
    }
  
    return poll;
  }

  /*
  update(id: number, updatePollDto: UpdatePollDto) {
    return `This action updates a #${id} poll`;
  }

  remove(id: number) {
    return `This action removes a #${id} poll`;
  }
  */

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
    const result = await this.pollModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException();
    }
  }


}
