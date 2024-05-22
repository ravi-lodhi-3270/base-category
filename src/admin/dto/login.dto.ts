import { IsNotEmpty, IsEmail } from 'class-validator';

export class AdminLoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}
