import { Model } from 'mongoose';
import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Vote, VoteDocument } from 'src/schemas/vote.schema';
import { Answer, AnswerDocument } from 'src/schemas/answer.schema';
import { AnswersService } from 'src/answers/answers.service';
import { Poll, PollDocument } from 'src/schemas/poll.schema';
import { PollsService } from 'src/polls/polls.service';

@Injectable()
export class VotesService {
  constructor(
    @InjectModel(Vote.name) private voteModel: Model<VoteDocument>,
    @InjectModel(Answer.name) private answerModel: Model<AnswerDocument>,
    @InjectModel(Poll.name) private pollModel: Model<PollDocument>,
    private readonly pollsService: PollsService,
    private readonly answersService: AnswersService,
  ) {}
  
  async create(createVoteDto: CreateVoteDto) {

    // enhancement: do transaction here

    const createdVote = new this.voteModel(createVoteDto);
    const { pollId: poll, answerId: answer } = createdVote;
    
    //const existingPoll = await this.pollsService.findOne(poll._id.toString());
    const existingPoll = await this.pollModel
                              .findById(poll);

    if(!existingPoll){
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

    if(isVoted) {
      throw new UnprocessableEntityException('You voted this "'+ existingPoll.name + '" campaign already.');
    }

    const existingAnswer = await this.answerModel
                              .findByIdAndUpdate(answer, {$inc : {'voteCount' : 1}})
                              .setOptions({ overwrite: true, new: true })
                              .exec();

    if (!existingAnswer) {
      throw new NotFoundException('answer "' + answer._id.toString() + '" not found');
    }

    //await createdVote.populate('answerId');
    
    await createdVote.populate({
      path : 'answerId',
      populate : {
        path : 'pollId'
      }
    })

    return createdVote.save();
  }

  findAll() {
    return `This action returns all votes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vote`;
  }

  update(id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`;
  }

  remove(id: number) {
    return `This action removes a #${id} vote`;
  }
}
