import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PollsModule } from './polls/polls.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersModule } from './answers/answers.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://Fei:27017,Fei:27018,Fei:27019/simple-voting?replicaSet=rs'), PollsModule, AnswersModule, VotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
