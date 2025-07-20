import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @ApiProperty({
    description: 'Title of the post',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    description: 'Content of the post',
  })
  @Prop({ required: true })
  content: string;

  @ApiProperty({
    description: 'User ID of the post author',
  })
  @Prop({ required: true })
  userId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
