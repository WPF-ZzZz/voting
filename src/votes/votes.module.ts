import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';

import { AnswersModule } from 'src/answers/answers.module';
import { Poll, PollSchema } from 'src/polls/poll.schema';
import { Answer, AnswerSchema } from 'src/answers/answer.schema';
import { PollsModule } from 'src/polls/polls.module';
import { Vote, VoteSchema } from './vote.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Vote.name, schema: VoteSchema },
        { name: Answer.name, schema: AnswerSchema },
        { name: Poll.name, schema: PollSchema },
      ]
    ),
    AnswersModule,
    PollsModule
  ],
  controllers: [VotesController],
  providers: [VotesService],
  exports:[VotesService]
})
export class VotesModule {}
