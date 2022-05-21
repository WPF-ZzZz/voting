//import { PartialType } from '@nestjs/mapped-types';
import { CreateVoteDto } from './create-vote.dto';
import { OmitType, PartialType, PickType } from '@nestjs/swagger';

export class UpdateVoteDto extends OmitType(CreateVoteDto, ['pollId'] as const) {}
