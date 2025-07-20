import { Controller, Post, Body, UseGuards, Req, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { UserDto } from 'src/users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: UserDto): Promise<{ access_token: string }> {
    return this.authService.signup(body);
  }

  @Post('login')
  login(@Body() body: UserDto): Promise<{ access_token: string }> {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(@Req() req, @Body() body: UserDto) {
    return this.authService.changePassword(req.user.userId, body.password);
  }

  @Patch('reset-password')
  resetPassword(@Body() body: UserDto) {
    return this.authService.resetPassword(body);
  }
}
