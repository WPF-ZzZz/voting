import { IsString, IsNotEmpty, IsDate, IsMongoId, Matches } from 'class-validator';
import { IsHKID } from 'src/decorators/validations/IsHKID';

export class CreateVoteDto {
    
    @IsNotEmpty()
    @IsMongoId()
    pollId: string

    @IsNotEmpty()
    @IsMongoId()
    answerId: string

    @IsNotEmpty()
    @Matches(/^[A-Z]{1,2}[0-9]{6}[0-9A]$/, { message: "$value is not a right HKID format." })
    @IsHKID({message: '$value is not a valid HKID.'})
    hkid: string
}

export default CreateVoteDto;