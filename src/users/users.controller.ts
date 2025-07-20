import {
  Controller,
  Get,
  UseGuards,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';
import { User } from './user.schema';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users') // This decorator is used to group the endpoints in Swagger documentation
@ApiBearerAuth() // This decorator adds the Bearer token authentication to the Swagger documentation
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users/me — return the current user's profile
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({
    description: 'Returns the current user profile',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: any): Promise<User | null> {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // GET /users — return a list of all users (optional; guard as needed)
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'Returns a list of all users',
    type: [User],
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
