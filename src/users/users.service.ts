import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import Database from '../utils/database/database';
import User from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private database: Database) {}
  async getAllUsers(): Promise<User[]> {
    return await this.database.users.findMany();
  }

  async getUser(id: string): Promise<User> {
    return await this.database.users.findOne({ key: 'id', equals: id });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.database.users.create(user);
  }

  async updatePassword(
    id: string,
    password: string,
    currentUserVersion: number,
  ): Promise<User> {
    return await this.database.users.change(id, {
      password,
      version: ++currentUserVersion,
      updatedAt: Date.now(),
    });
  }

  async deleteUser(id: string): Promise<User> {
    return await this.database.users.delete(id);
  }
}
