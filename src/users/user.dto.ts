import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsOptional()
  @MinLength(6, { message: 'Password should be at least 6 characters' })
  password: string;
}
