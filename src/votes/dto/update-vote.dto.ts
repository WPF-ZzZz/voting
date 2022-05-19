//import { PartialType } from '@nestjs/mapped-types';
import { CreateVoteDto } from './create-vote.dto';
import { PartialType, PickType } from '@nestjs/swagger';

export class UpdateVoteDto extends PartialType(CreateVoteDto) {}
