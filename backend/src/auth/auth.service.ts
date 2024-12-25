// auth.service.ts

import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service'; // assuming you have a UsersService to manage users

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Sign in functionality
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find the user by email
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate and return the JWT token
    const payload = {name:user.name, email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { token:accessToken,name:user.name, email: user.email, id: user.id };
  }

  // Sign up functionality
  async signUp(signUpDto: SignUpDto) {
    const { name,email, password } = signUpDto;

    // Check if the user already exists
    const existingUser = await this.usersService.getUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await this.usersService.createUser({ name ,email, password: hashedPassword });

    // Generate and return the JWT token
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
