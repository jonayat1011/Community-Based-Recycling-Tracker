import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context) {
    // Log the incoming authorization header for debugging
    const request = context.switchToHttp().getRequest();
    console.log('Authorization header:', request.headers.authorization); // Debugging line
    return super.canActivate(context);
  }
}
