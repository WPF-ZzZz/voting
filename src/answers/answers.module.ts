import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, AnswerSchema } from './answer.schema';
import { VotesModule } from 'src/votes/votes.module';
import { PollsModule } from 'src/polls/polls.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Answer.name, schema: AnswerSchema }]),
    VotesModule,
  ],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports:[AnswersService]
})
export class AnswersModule {}
