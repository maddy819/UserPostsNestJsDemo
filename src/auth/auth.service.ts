import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserDto } from 'src/users/user.dto';
import { UserDocument } from 'src/users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(user: UserDto): Promise<{ access_token: string }> {
    try {
      if (!user.name || !user.email || !user.password) {
        throw new UnauthorizedException(
          'Name, email and password are required',
        );
      }

      const hashed = await bcrypt.hash(user.password, 10);

      const newUser = await this.usersService.create({
        name: user.name,
        email: user.email,
        password: hashed,
      });

      if (!newUser) {
        throw new UnauthorizedException('User creation failed');
      }

      const payload = { sub: newUser._id, email: newUser.email };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Failed to fetch user');
    }
  }

  async login(user: UserDto): Promise<{ access_token: string }> {
    try {
      if (!user.email || !user.password) {
        throw new UnauthorizedException('Email and password are required');
      }

      const foundUser = await this.usersService.findByEmail(user.email);

      if (
        !foundUser ||
        !(await bcrypt.compare(user.password, foundUser.password))
      ) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { sub: foundUser._id, email: foundUser.email };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Failed to login');
    }
  }

  async changePassword(
    userId: string,
    newPassword: string,
  ): Promise<UserDocument | null> {
    try {
      if (!userId) {
        throw new UnauthorizedException('User ID is required');
      }

      if (!newPassword || newPassword.length < 6) {
        throw new UnauthorizedException(
          'New password must be at least 6 characters long',
        );
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      return this.usersService.updatePassword(userId, hashed);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Failed to change password');
    }
  }

  // src/auth/auth.service.ts
  async resetPassword(User: UserDto): Promise<UserDocument | null> {
    if (!User.email || !User.password) {
      throw new UnauthorizedException('Email and password are required');
    }

    if (User.password.length < 6) {
      throw new UnauthorizedException('Password must be at least 6 characters');
    }

    const user = await this.usersService.findByEmail(User.email);
    if (!user) throw new UnauthorizedException('Email not found');

    const hashed = await bcrypt.hash(User.password, 10);
    // user.id is always a string
    return this.usersService.updatePassword(user.id, hashed);
  }
}
