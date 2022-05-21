//import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto';
import { OmitType, PartialType, PickType } from '@nestjs/swagger';

export class UpdateAnswerDto extends OmitType(CreateAnswerDto, ['pollId' as const]) {}
