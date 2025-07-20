import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// This guard uses the JWT strategy to protect routes
// It will automatically validate the JWT token and attach the user to the request object
// If the token is invalid or missing, it will throw an UnauthorizedException