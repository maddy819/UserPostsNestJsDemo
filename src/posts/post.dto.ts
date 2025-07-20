import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class PostDto {
  @ApiProperty({
    description: 'Title of the post',
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({
    description: 'Content of the post',
  })
  @IsString({ message: 'Content must be a string' })
  @IsNotEmpty({ message: 'Content is required' })
  @MinLength(100, { message: 'Content should be at least 100 characters' })
  content: string;

  @ApiProperty({
    description: 'ID of the user who created the post',
    required: false,
  })
  @IsString({ message: 'User ID must be a string' })
  @IsOptional()
  userId: string;
}
