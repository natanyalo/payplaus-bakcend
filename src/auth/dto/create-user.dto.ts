import { IsString, IsEmail, IsNumber, IsEnum } from 'class-validator';
import { Expose } from 'class-transformer';
export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  hashPassword: string;
  refreshTokens?: string;
}
