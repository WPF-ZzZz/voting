import { IsString, IsNotEmpty, IsDate, IsMongoId, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsHKID } from 'src/decorators/validations/IsHKID';

export class CreateVoteDto {
    
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({ type: String })
    pollId: string

    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({ type: String })
    answerId: string

    @IsNotEmpty()
    @Matches(/^[A-Z]{1,2}[0-9]{6}[0-9A]$/, { message: "($value) is not a right HKID format." })
    @IsHKID()
    @ApiProperty({ type: String })
    hkid: string
    
}

export default CreateVoteDto;