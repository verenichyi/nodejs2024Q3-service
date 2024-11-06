import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Incorrect password' })
  oldPassword: string;
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Incorrect password' })
  newPassword: string;
}
