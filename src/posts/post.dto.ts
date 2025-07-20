import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class PostDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  @MinLength(100, { message: 'Content should be at least 100 characters' })
  content: string;

  @IsString({ message: 'User ID must be a string' })
  @IsOptional()
  userId: string;
}
