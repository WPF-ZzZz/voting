import { IsString, IsNotEmpty, IsDate, IsDateString } from 'class-validator';
import { Answer } from 'src/schemas/answer.schema';

export class CreatePollDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    displayName: string;
  
    @IsString()
    @IsNotEmpty()
    question: string;
  
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;
  
    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    answers: Answer[];
}

export default CreatePollDto;