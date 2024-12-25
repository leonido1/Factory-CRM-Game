// auth.controller.ts

import { Controller, Post, Request,Body,Get,UseGuards  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Assuming you have a JWT guard

import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../users/user.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login route
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Sign up route
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(JwtAuthGuard) // Protect the route with JWT guard
  @Get('user')
  async getUser(@Request() req): Promise<User> {
    
  return req. user; // Assuming user data is attached to the request by the guard
  }

}
