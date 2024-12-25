import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() data: { name: string; email: string; password: string }) {
    return this.usersService.createUser(data);
  }

  @Get()
  getUsers() {
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
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(Number(id));
  }
}
