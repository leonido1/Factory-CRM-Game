// auth.controller.ts

import { Controller, Post, Request, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Assuming you have a JWT guard
import {JwtRefreshGuard} from './guards/jwt-refresh.guard';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from '../users/user.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Login route
  @Post('login')
  async login(@Body() loginDto: LoginDto,@Req() req, @Res() res) {
    return await this.authService.login(loginDto,req,res);
  }

  // Sign up route
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(JwtAuthGuard) // Protect the route with JWT guard
  @Get('user')
  async getUser(@Request() req): Promise<User> {
    console.log('getUser');
    return req.user; // Assuming user data is attached to the request by the guard
  }

  @UseGuards(JwtRefreshGuard) // Protect the route with JWT guard
  @Post('refresh')
  async refresh(@Req() req:Request, @Res() res:Response) {
  
    return await this.authService.refresh(req,res);
  }

}
