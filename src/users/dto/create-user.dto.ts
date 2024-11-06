import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Login is required' })
  @IsString({ message: 'Incorrect login' })
  login: string;
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Incorrect password' })
  password: string;
}
