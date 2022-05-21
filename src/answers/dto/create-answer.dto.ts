import { IsString, IsNotEmpty, IsDate, IsMongoId, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAnswerDto {
    
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({ type: String })
    pollId: string

    @IsNotEmpty()
    @ApiProperty({ type: String })
    text: string
}

export default CreateAnswerDto;
