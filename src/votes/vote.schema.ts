import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';

import { Poll } from 'src/polls/poll.schema';
import { Answer } from 'src/answers/answer.schema';

export type VoteDocument = Vote & Document;

@Schema()
export class Vote {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  hkid: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Answer', required: true })
  @Type(() => Answer)
  answerId: Answer;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Poll', required: true })
  @Type(() => Poll)
  pollId: Poll;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);