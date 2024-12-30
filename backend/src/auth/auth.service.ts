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
  async login(loginDto: LoginDto,req,res) {
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
    const accessToken = this.generateAccessToken({userId:user.id.toString()});;
    const newRefreshToken = this.generateRefreshToken({userId:user.id.toString()});
    
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true });


    return res.json({ token:accessToken,name:user.name, email: user.email, id: user.id });
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

  async refresh(req,  res){
    // console.log(cookie);
    const refreshToken =  req.cookies.refreshToken;  //cookie.parse(req.headers().cookies)['refreshToken'];
    if (!refreshToken) {
      return res.status(401).send('No refresh token provided');
    }

    try {
      // Verify the refresh token
      const newAccessToken = this.generateAccessToken({userId:req.user.userId});
      const newRefreshToken = this.generateRefreshToken({userId:req.user.userId});

      // Update the refresh token cookie
      res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true });

      return res.json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(401).send('Invalid refresh token');
    }

  }


  // Generate Access Token
  generateAccessToken(payload: { userId: string }) {
    return this.jwtService.sign(payload, { expiresIn: '1m' }); // Short-lived token
  }

  // Generate Refresh Token
  generateRefreshToken(payload: { userId: string }) {
    return this.jwtService.sign(payload, { expiresIn: '7d',secret:'11112112423' }); // Long-lived token
  }

  // Verify Token
  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }

  // Decode Token without verification
  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

}
