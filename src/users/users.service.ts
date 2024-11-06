import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import DB from '../utils/DB/DB';
import User from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private database: DB) {}
  async getAllUsers(): Promise<User[]> {
    return this.database.users.findMany();
  }

  async getUser(id: string): Promise<User> {
    return this.database.users.findOne({ key: 'id', equals: id });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.database.users.create(user);
  }

  async updatePassword(
    id: string,
    password: string,
    currentUserVersion: number,
  ): Promise<User> {
    return this.database.users.change(id, {
      password,
      version: ++currentUserVersion,
      updatedAt: Date.now(),
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.database.users.delete(id);
  }
}
