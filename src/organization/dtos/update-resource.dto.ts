import { IsOptional, IsString, Length, IsUrl } from 'class-validator';

export class UpdateResourceDto {
  @IsOptional()
  @IsString()
  @Length(5, 100, {
    message: 'Resource name must be between 5 and 100 characters',
  })
  name?: string;

  @IsOptional()
  @IsUrl({}, { message: 'URL must be a valid URL' })
  url?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}
