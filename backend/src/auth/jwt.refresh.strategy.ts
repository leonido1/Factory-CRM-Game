import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt.refresh') {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies['refreshToken']; // Extract refresh token from cookies
      },
      secretOrKey: '11112112423', // Use a different secret key for refresh token
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    // Here you can access the payload and check if the refresh token is valid
    const refreshToken = req.cookies['refreshToken']; // Get the refresh token from cookies
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    // Validate the refresh token if needed (e.g., check if it's expired)
    const user = await this.jwtService.verifyAsync(refreshToken, {
      secret: '11112112423',
    });

    if (!user) {
      throw new Error('Invalid refresh token');
    }

    return user; // Return the user object
  }
}
