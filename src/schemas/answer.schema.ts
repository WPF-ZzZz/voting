import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Poll, PollSchema } from './poll.schema';

export type AnswerDocument = Answer & Document;

@Schema({
  toJSON: {
      getters: true,
      virtuals: true,
  },
})
export class Answer {

  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ default: 0 })
  voteCount: Number;

  //@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poll'}] })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Poll' })
  @Type(() => Poll)
  pollId: Poll;
}


export const AnswerSchema = SchemaFactory.createForClass(Answer);