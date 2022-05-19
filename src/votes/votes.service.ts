import mongoose, { Model } from 'mongoose';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

import { Vote, VoteDocument } from './vote.schema';
import { Answer, AnswerDocument } from 'src/answers/answer.schema';
import { Poll, PollDocument } from 'src/polls/poll.schema';


@Injectable()
export class VotesService {
  constructor(
    @InjectModel(Vote.name) private voteModel: Model<VoteDocument>,
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(Poll.name) private pollModel: Model<PollDocument>
  ) { }

  async create(createVoteDto: CreateVoteDto) {

    // enhancement: do transaction here

    const createdVote = new this.voteModel(createVoteDto);
    const { pollId: poll, answerId: answer } = createdVote;

    //const existingPoll = await this.pollsService.findOne(poll._id.toString());
    const existingPoll = await this.pollModel
      .findById(poll);

    if (!existingPoll) {
      throw new NotFoundException('Campaign "' + poll._id.toString() + '" not found');
    }

    // c. The campaign will not accept new vote after the end time
    const isCampaignAvailable = existingPoll.endDate >= new Date();

    if (!isCampaignAvailable) {
      throw new UnprocessableEntityException('Not able to vote as campaign end already.');
    }

    const filters = {};

    filters['pollId'] = existingPoll._id;
    filters['hkid'] = createdVote.hkid;

    // 2. An HKID no. allow voting ONLY ONE candidate for each campaign
    const isVoted = await this.voteModel
      .findOne(filters)
      .exec();

    if (isVoted) {
      throw new UnprocessableEntityException(`You voted this "${existingPoll.name}" campaign already.`);
    }

    const existingAnswer = await this.answerModel
      .findByIdAndUpdate(answer, { $inc: { 'voteCount': 1 } })
      .setOptions({ overwrite: true, new: true })
      .exec();

    if (!existingAnswer) {
      throw new NotFoundException(`answer "' ${answer._id.toString()}" not found`);
    }

    await createdVote.populate({
      path: 'answerId',
      populate: {
        path: 'pollId'
      }
    })

    return createdVote.save();
  }

  async findAll(): Promise<Vote[]> {
    return this.voteModel
      .find()
      .populate('answers')
      .exec();
  }

  async findOne(id: string): Promise<Vote> {
    const vote = await this.voteModel
      .findById(id)
      .populate('answers');

    if (!vote) {
      throw new NotFoundException();
    }

    return vote;
  }

  async update(id: string, updatevoteDto: UpdateVoteDto) {
    const vote = await this.voteModel
      .findByIdAndUpdate(id, updatevoteDto)
      .setOptions({ overwrite: true, new: true });
    if (!vote) {
      throw new NotFoundException();
    }
    return vote;
  }

  async remove(id: string) {
    const result = await this.voteModel.findByIdAndDelete(id);
    const { answerId: answer } = result;

    const existingAnswer = await this.answerModel
      .findByIdAndUpdate(answer, { $inc: { 'voteCount': -1 } })
      .setOptions({ overwrite: true, new: true })
      .exec();

    if (!result) {
      throw new NotFoundException();
    }
  }

  async findVoteByAnswerId(id: string) : Promise<Vote[]>{

    const filters = {};
    filters['answerId'] = id;

    const votes = await this.voteModel
      .find(filters)
      .exec()

    return votes;
  }

  async deleteMany(
    ids: string[],
    session: mongoose.ClientSession | null = null,
  ) {
    return this.voteModel.deleteMany({ _id: ids }).session(session);
  }
}
