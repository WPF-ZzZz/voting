import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PollsController } from './polls.controller';
import { PollsService } from './polls.service';
import { Poll, PollSchema } from './poll.schema';
import { Answer, AnswerSchema } from 'src/answers/answer.schema';
import { Vote, VoteSchema } from 'src/votes/vote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vote.name, schema: VoteSchema },
      { name: Answer.name, schema: AnswerSchema },
      { name: Poll.name, schema: PollSchema }
    ])
    //AnswersModule
  ], 
  controllers: [PollsController],
  providers: [PollsService],
  exports: [PollsService]
})
export class PollsModule {}
