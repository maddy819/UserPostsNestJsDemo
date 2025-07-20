import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({
    description: 'Name of the user',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    description: 'Email of the user',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
  })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
