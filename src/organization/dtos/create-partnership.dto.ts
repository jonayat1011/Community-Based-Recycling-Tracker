import { IsString, Length, IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/entities/user.entity';

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

  @IsNotEmpty({ message: 'Guest user ID is required' })
  @IsNumber({}, { message: 'Guest user ID must be a number' })
  guestUserId: number;
  partnerId: any;
}
