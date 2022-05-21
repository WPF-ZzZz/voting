import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse,  ApiNotFoundResponse,  ApiOkResponse,  ApiTags,  ApiUnprocessableEntityResponse} from '@nestjs/swagger';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('answers')
@ApiTags('answers')
@UseFilters(HttpExceptionFilter)
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Answer created successfully.' })
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Answers retrieved successfully.' })
  findAll() {
    return this.answersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Answer retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Answer not found.' })
  findOne(@Param('id') id: string) {
    return this.answersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Answer updated successfully.' })
  @ApiNotFoundResponse({ description: 'Answer not found.' })
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answersService.update(id, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Answer deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Answer not found.' })
  remove(@Param('id') id: string) {
    return this.answersService.remove(id);
  }
}
