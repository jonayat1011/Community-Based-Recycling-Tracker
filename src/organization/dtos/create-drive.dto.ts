import { IsString, Length, IsDate, IsNotEmpty, Validate } from 'class-validator';
import { Type } from 'class-transformer';
import { EndDateValidation, StartDateValidation } from '../custom-date-validators';

export class CreateDriveDto {
  @IsString()
  @Length(5, 100, { message: 'Title must be between 5 and 100 characters' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsString({ message: 'Location must be a string' })
  @IsNotEmpty({ message: 'Location is required' })
  location: string;

  @IsDate({ message: 'Start date must be a valid date' })
  @IsNotEmpty({ message: 'Start date is required' })
  @Type(() => Date)
  @Validate(StartDateValidation, { message: 'Start date must be at least 7 days from today' })
  startDate: Date;

  @IsDate({ message: 'End date must be a valid date' })
  @IsNotEmpty({ message: 'End date is required' })
  @Type(() => Date)
  @Validate(EndDateValidation, {
    message: 'End date must be more than 2 days after the start date and less than 5 days',
  })
  endDate: Date;
}
