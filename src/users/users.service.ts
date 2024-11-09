import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const { login, password } = user;
    const now = Date.now();

    const newUser = this.userRepository.create({
      login: login,
      password: password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    });

    await this.userRepository.save(user);
    return newUser;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.getUser(id);

    if (user.password !== oldPassword) {
      throw new HttpException(`Old password is wrong`, HttpStatus.FORBIDDEN);
    }

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version++;

    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser(id);
    await this.userRepository.delete({ id: user.id });
  }
}
