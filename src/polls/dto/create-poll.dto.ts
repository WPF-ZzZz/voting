import { IsString, IsNotEmpty, IsDate, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Answer } from 'src/answers/answer.schema';

export class CreatePollDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    displayName: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String })
    question: string;
  
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ type: String, format: 'date-time' })
    startDate: Date;
  
    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ type: String, format: 'date-time' })
    endDate: Date;

    answers: Answer[];
}

export default CreatePollDto;