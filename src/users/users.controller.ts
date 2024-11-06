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
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ReturnUser } from './types/return-user.type';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllUsers(): Promise<ReturnUser[]> {
    return await this.userService.getAllUsers();
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

    return user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ReturnUser> {
    return await this.userService.createUser(createUserDto);
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

    return await this.userService.updatePassword(id, newPassword, user.version);
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
