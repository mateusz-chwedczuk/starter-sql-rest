import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class RegisterRequest {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(8, 128)
  @Matches(/^(?=.*[A-Z]).*$/)
  @Matches(/^(?=.*[\d]).*$/)
  @Matches(/^(?=.*[^\p{L}\d\s]).*$/u)
  password: string;
}
