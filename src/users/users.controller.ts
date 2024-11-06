import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUser } from './types/return-user.type';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { excludePasswordFromUser } from '../utils/excludePasswordFromUser';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllUsers(): Promise<ReturnUser[]> {
    const users = await this.userService.getAllUsers();

    return users.map((user) => excludePasswordFromUser(user));
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<ReturnUser> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
    }

    return excludePasswordFromUser(user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ReturnUser> {
    const user = await this.userService.createUser(createUserDto);

    return excludePasswordFromUser(user);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<ReturnUser> {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
    }

    if (user.password !== oldPassword) {
      throw new HttpException(`Old password is wrong`, HttpStatus.FORBIDDEN);
    }

    const updatedUser = await this.userService.updatePassword(
      id,
      newPassword,
      user.version,
    );

    return excludePasswordFromUser(updatedUser);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
    }

    await this.userService.deleteUser(id);
  }
}
