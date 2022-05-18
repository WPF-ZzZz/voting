//import { PartialType } from '@nestjs/mapped-types';
import { CreatePollDto } from './create-poll.dto';
import { PartialType, PickType } from '@nestjs/swagger';

export class UpdatePollDto extends PartialType(CreatePollDto) {}
