import { IsEmail, IsEnum, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
  })
  password: string;
  

  @IsString()
  @Length(8, 20, { message: 'Password confirmation must be between 8 and 20 characters' })
  confirmPassword: string;

  @IsEnum(['Admin', 'Recycler', 'Organization', 'Citizen'], {
    message: 'Invalid role',
  })
  role: string;
}
