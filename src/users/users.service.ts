import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Create a new user
  async create(user: UserDto): Promise<UserDocument> {
    try {
      const createdUser = new this.userModel(user);
      return await createdUser.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  // Find user by email, omitting the password field
  async findByEmail(email: string): Promise<UserDocument | null> {
    try {
      return await this.userModel.findOne({ email });
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by email');
    }
  }

  // Find user by ID, omitting the password field
  async findById(id: string): Promise<UserDocument | null> {
    try {
      return await this.userModel
        .findById(id)
        .select('-password') // omit password field
        .exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to find user by ID');
    }
  }

  // Update user password
  async updatePassword(
    userId: string,
    newPassword: string,
  ): Promise<UserDocument | null> {
    try {
      return await this.userModel.findByIdAndUpdate(
        userId,
        { password: newPassword },
        { new: true },
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to update password');
    }
  }

  // (Optional) List all users, omitting passwords
  async findAll(): Promise<UserDocument[]> {
    try {
      return await this.userModel.find().select('-password').exec();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch all users');
    }
  }
}
