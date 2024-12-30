import { Module } from '@nestjs/common';
import cookie  from 'cookie';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt.refresh.strategy';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

console.log(cookie);

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: '68768686868', // Replace with a secure key
      signOptions: { expiresIn: '1h' },

    }),
  ],
  providers: [AuthService, JwtStrategy,JwtRefreshStrategy],
  exports: [AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
