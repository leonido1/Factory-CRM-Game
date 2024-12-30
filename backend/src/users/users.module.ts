import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  providers: [UsersService,PrismaService,JwtStrategy],
  controllers: [UsersController],
  exports:[UsersService],
})
export class UsersModule {}
