import { Controller, Post, Body, UseGuards, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { UserDto } from 'src/users/user.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/user.schema';

@ApiTags('auth') // This decorator is used to group the endpoints in Swagger documentation
@Controller('auth') // Base route for authentication endpoints
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User signup' })
  @ApiOkResponse({
    description: 'Returns an access token upon successful signup',
    type: String,
  })
  @Post('signup')
  signup(@Body() body: UserDto): Promise<{ access_token: string }> {
    return this.authService.signup(body);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({
    description: 'Returns an access token upon successful login',
    type: String,
  })
  @Post('login')
  login(@Body() body: UserDto): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }

  @ApiBearerAuth() // This decorator adds the Bearer token authentication to the Swagger documentation
  @ApiOperation({ summary: 'Change user password' })
  @ApiOkResponse({
    description:
      'Changes the user password and returns the updated user information',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(@Req() req, @Body() body: UserDto): Promise<User | null> {
    return this.authService.changePassword(req.user.userId, body.password);
  }

  @ApiOperation({ summary: 'Reset user password' })
  @ApiOkResponse({
    description:
      'Resets the user password and returns the updated user information',
    type: User,
  })
  @Patch('reset-password')
  resetPassword(@Body() body: UserDto): Promise<User | null> {
    return this.authService.resetPassword(body);
  }
}
