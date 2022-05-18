import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PollsModule } from './polls/polls.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersModule } from './answers/answers.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [PollsModule, MongooseModule.forRoot('mongodb://localhost/simple-voting'), AnswersModule, VotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
