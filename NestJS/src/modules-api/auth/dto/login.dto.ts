import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Min,
  IsUppercase,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  //   @IsUppercase()
  password: string;
}
