import { IsString, Length, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePartnershipDto {
  @IsString()
  @Length(3, 50, {
    message: 'Partner name must be between 3 and 50 characters',
  })
  partnerName: string;

  @IsNotEmpty({ message: 'Start date is required' })
  @IsDate({ message: 'Start date must be a valid date' })
  startDate: Date;

  @IsNotEmpty({ message: 'End date is required' })
  @IsDate({ message: 'End date must be a valid date' })
  endDate: Date;

  @IsNumber({}, { message: 'User ID must be a number' })
  @IsNotEmpty({ message: 'User ID is required' })
  userId: number;
}
