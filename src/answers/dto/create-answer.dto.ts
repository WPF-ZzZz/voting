import { IsString, IsNotEmpty, IsDate, IsMongoId, Matches } from 'class-validator';

export class CreateAnswerDto {
    
    @IsNotEmpty()
    @IsMongoId()
    pollId: string

    @IsNotEmpty()
    text: string
}

export default CreateAnswerDto;

//export class CreateAnswerDto {}
