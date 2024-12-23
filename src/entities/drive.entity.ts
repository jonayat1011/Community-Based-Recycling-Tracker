import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { IsDate, IsString, Length } from 'class-validator';
import { User } from './user.entity';
import { Partnership } from './partnership.entity';
import { Event } from './event.entity';


export enum DriveStatus {
  PENDING = 'pending',
  APPROVED  = 'Approved',
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  DECLINED = 'declined',
}

@Entity()
export class Drive {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(5, 100, { message: 'Title must be between 5 and 100 characters' })
  title: string;

  @Column('text')
  @IsString({ message: 'Description must be a string' })
  description: string;

  @Column()
  @IsString({ message: 'Location must be a string' })
  location: string;

  @Column('timestamp')
  @IsDate({ message: 'Start date must be a valid date' })
  startDate: Date;

  @Column('timestamp')
  @IsDate({ message: 'End date must be a valid date' })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.drives)
  organizer: User;

  @ManyToOne(() => Partnership, (partnership) => partnership.drives)
  Partnership: Partnership;

  @Column({
    type: 'enum',
    enum: DriveStatus,
    default: DriveStatus.PENDING,
  })
  status: DriveStatus;

  @OneToOne(() => Event, (event) => event.drive)
  @JoinColumn()  // Ensure a column is created for the relationship
  event: Event;
}
