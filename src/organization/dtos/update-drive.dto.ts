import { IsString, Length, IsDate, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateDriveDto {
  @IsString()
  @IsOptional()
  @Length(5, 100, { message: 'Title must be between 5 and 100 characters' })
  title?: string;

  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @IsString({ message: 'Location must be a string' })
  @IsOptional()
  location?: string;

  @IsDate({ message: 'Start date must be a valid date' })
  @IsOptional()
  startDate?: Date;

  @IsDate({ message: 'End date must be a valid date' })
  @IsOptional()
  endDate?: Date;


}
