import mongoose, { Model } from 'mongoose';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Poll, PollDocument } from '../polls/poll.schema';
import { Answer, AnswerDocument } from './answer.schema';

import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { VotesService } from '../votes/votes.service';

@Injectable()
export class AnswersService {
  private readonly logger = new Logger(AnswersService.name);

  constructor(
    @InjectConnection() private readonly connection: mongoose.Connection,
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    private readonly votesService: VotesService,
  ) { }

  async create(createAnswerDto: CreateAnswerDto) {
    const createdAnswer = new this.answerModel(createAnswerDto);
    await createdAnswer.populate('pollId');
    return createdAnswer.save();
  }

  async findAll(): Promise<Answer[]> {

    this.logger.log(`findAll called`);
    return this.answerModel
      .find()
      .exec();

    //return `This action returns all answerss`;
  }

  async findOne(id: string): Promise<Answer> {
    const answer = await this.answerModel
      .findById(id);

    if (!answer) {
      throw new NotFoundException();
    }

    return answer;
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.answerModel
      .findByIdAndUpdate(id, updateAnswerDto)
      .setOptions({ overwrite: true, new: true });
    if (!answer) {
      throw new NotFoundException();
    }
    return answer;
  }

  async remove(id: string) {

    this.logger.log(`Starting to delete answer: ${id}`);

    const session = await this.connection.startSession();

    session.startTransaction();
    try {
      const answer = await this.answerModel
        .findByIdAndDelete(id)
        .session(session);

      if (!answer) {
        throw new NotFoundException();
      }

      const votes = await this.votesService.findVoteByAnswerId(id);

      await this.votesService.deleteMany(
        votes.map((vote) => vote._id.toString()),
        session,
      );
      await session.commitTransaction();

      this.logger.log(`Deleted answer: ${id}`);

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  /*
  create(createAnswerDto: CreateAnswerDto) {
    return 'This action adds a new answer';
  }

  findAll() {
    return `This action returns all answers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
  */
}
