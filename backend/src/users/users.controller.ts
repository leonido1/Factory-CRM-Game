import { Controller, Get, Post, Body, Param, Put, Delete,UseGuards,Request  } from '@nestjs/common';
import { UsersService } from './users.service';
import {JwtAuthGuard} from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard) // Protect the route with JWT guard
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() data: { name: string; email: string; password: string }) {
    return this.usersService.createUser(data);
  }
  
  @Get()
  getUsers(@Request() req) {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(Number(id));
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() data: any) {
    return this.usersService.updateUser(Number(id), data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: number, ) {
    return this.usersService.deleteUser(Number(id));
  }
}
