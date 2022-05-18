import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Poll, PollDocument } from 'src/schemas/poll.schema';
import { Answer, AnswerDocument } from 'src/schemas/answer.schema';

import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
//import { VotesService } from 'src/votes/votes.service';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    //private readonly votesService: VotesService,
    //@InjectConnection() private readonly connection: mongoose.Connection,
  ) {}

  async create(createAnswerDto: CreateAnswerDto) {
    const createdAnswer = new this.answerModel(createAnswerDto);
    await createdAnswer.populate('pollId');
    return createdAnswer.save();
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
