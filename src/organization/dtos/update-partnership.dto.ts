import { IsOptional, IsString, Length, IsDate } from 'class-validator';

export class UpdatePartnershipDto {
  @IsOptional()
  @IsString()
  @Length(3, 50, {
    message: 'Partner name must be between 3 and 50 characters',
  })
  partnerName?: string;

  @IsOptional()
  @IsDate({ message: 'Start date must be a valid date' })
  startDate?: Date;

  @IsOptional()
  @IsDate({ message: 'End date must be a valid date' })
  endDate?: Date;
}
