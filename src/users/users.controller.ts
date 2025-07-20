import {
  Controller,
  Get,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';
import { UserDocument } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users/me — return the current user's profile
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any): Promise<UserDocument | null> {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // GET /users — return a list of all users (optional; guard as needed)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}
