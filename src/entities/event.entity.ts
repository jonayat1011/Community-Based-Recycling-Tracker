import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsDate, IsString, Length } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(5, 100, {
    message: 'Event name must be between 5 and 100 characters',
  })
  name: string;

  @Column('text')
  @IsString({ message: 'Description must be a string' })
  description: string;

  @Column('timestamp')
  @IsDate({ message: 'Event date must be a valid date' })
  eventDate: Date;

  @Column()
  @IsString({ message: 'Location must be a string' })
  location: string;

  @ManyToOne(() => User, (user) => user.events)
  organizer: User;
}
