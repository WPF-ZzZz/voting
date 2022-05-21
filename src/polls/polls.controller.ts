import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse,  ApiNotFoundResponse,  ApiOkResponse,  ApiTags,  ApiUnprocessableEntityResponse} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { PollsService } from './polls.service';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';

@Controller('polls')
@ApiTags('polls')
@UseFilters(HttpExceptionFilter)
export class PollsController {
  constructor(private readonly pollsService: PollsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Poll created successfully.' })
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollsService.create(createPollDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Polls retrieved successfully.' })
  findAll() {
    return this.pollsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Poll retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Poll not found.' })
  findOne(@Param('id') id: string) {
    return this.pollsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Poll updated successfully.' })
  @ApiNotFoundResponse({ description: 'Poll not found.' })
  update(@Param('id') id: string, @Body() updatePollDto: UpdatePollDto) {
    return this.pollsService.update(id, updatePollDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Poll deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Poll not found.' })
  remove(@Param('id') id: string) {
    return this.pollsService.remove(id);
  }
}
