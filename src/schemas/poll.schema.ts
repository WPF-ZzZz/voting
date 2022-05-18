import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId  } from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { Answer, AnswerSchema } from 'src/schemas/answer.schema';

export type PollDocument = Poll & Document;

@Schema({
    toJSON: {
        getters: true,
        virtuals: true,
    },
})
export class Poll {
    @Transform(({ value }) => value.toString())
    _id: ObjectId;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    displayName: string;

    @Prop({ required: true })
    question: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    //@Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }] })
    //@Prop( {type: [{ type : AnswerSchema }] })
    @Type(() => Answer)
    answers: Answer[];
}

const PollSchema = SchemaFactory.createForClass(Poll);

PollSchema.virtual('answers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'pollId',
});

PollSchema.virtual('')

export { PollSchema };