//import { PartialType } from '@nestjs/mapped-types';
import { CreateAnswerDto } from './create-answer.dto';
import { PartialType, PickType } from '@nestjs/swagger';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {}
