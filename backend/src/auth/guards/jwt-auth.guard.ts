// src/auth/guards/jwt-auth.guard.ts

import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {


    handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
         if (err || !user) {
          throw new UnauthorizedException('Invalid token');
        }
    
        // Example: Check token expiration
        const now = Math.floor(Date.now() / 1000);
        if (user.exp && user.exp < now) {
          throw new UnauthorizedException('Token has expired');
        }
    
        return user;
      }
}
