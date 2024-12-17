import { IsString, Length, IsUrl, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @Length(5, 100, {
    message: 'Resource name must be between 5 and 100 characters',
  })
  name: string;

  @IsUrl({}, { message: 'URL must be a valid URL' })
  url: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

 @IsNumber({}, { message: 'User ID must be a number' })
 @IsNotEmpty({ message: 'User ID is required' })
 userId: number;
}
