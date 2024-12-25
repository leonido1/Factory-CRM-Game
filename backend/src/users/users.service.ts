import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  createUser(data: { name: string; email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  getUsers() {
    return this.prisma.user.findMany();
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  updateUser(id: number, data: Partial<{ name: string; email: string; password: string }>) {
    return this.prisma.user.update({ where: { id }, data });
  }

  deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

 // Add this method to get a user by email
 async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
