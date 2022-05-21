import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse,  ApiNotFoundResponse,  ApiOkResponse,  ApiTags,  ApiUnprocessableEntityResponse} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Controller('votes')
@ApiTags('votes')
@UseFilters(HttpExceptionFilter)
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Vote created successfully.' })
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

  /*
  @Get()
  @ApiOkResponse({ description: 'Votes retrieved successfully.' })
  findAll() {
    return this.votesService.findAll();
  }
  */

  @Get(':id')
  @ApiOkResponse({ description: 'Vote retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Vote not found.' })
  findOne(@Param('id') id: string) {
    return this.votesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Vote updated successfully.' })
  @ApiNotFoundResponse({ description: 'Vote not found.' })
  update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.votesService.update(id, updateVoteDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Poll deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Poll not found.' })
  remove(@Param('id') id: string) {
    return this.votesService.remove(id);
  }
}
