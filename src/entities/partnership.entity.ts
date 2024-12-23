import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { IsDate, IsString, Length, IsEnum } from 'class-validator';
import { User } from './user.entity';
import { Drive } from './drive.entity';
import { Event } from './event.entity';

// Enum for status
export enum PartnershipStatus {
  REQUESTING = 'requesting',
  ACCEPTED = 'accepted',
  CANCELLED = 'cancelled',
}

@Entity()
export class Partnership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(3, 50, {
    message: 'Partner name must be between 3 and 50 characters',
  })
  partnerName: string;

  @Column('timestamp')
  @IsDate({ message: 'Start date must be a valid date' })
  startDate: Date;

  @Column('timestamp')
  @IsDate({ message: 'End date must be a valid date' })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.partnerships)
  hostUser: User;
  
  @ManyToOne(() => User, (user) => user.partnerships)
  guestUser: User;

  @OneToMany(() => Drive, (drive) => drive.Partnership)
  drives: Drive[];

  @OneToMany(() => Event, (event) => event.partnership)
  event: Event[];

  @Column({
    type: 'enum',
    enum: PartnershipStatus,
    default: PartnershipStatus.REQUESTING,
  })
  @IsEnum(PartnershipStatus, {
    message: 'Status must be one of: requesting, accepted, cancelled',
  })
  status: PartnershipStatus;
}
