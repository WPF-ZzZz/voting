import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { Vote, VoteSchema } from 'src/schemas/vote.schema';
import { AnswersModule } from 'src/answers/answers.module';
import { Poll, PollSchema } from 'src/schemas/poll.schema';
import { Answer, AnswerSchema } from 'src/schemas/answer.schema';
import { PollsModule } from 'src/polls/polls.module';

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
