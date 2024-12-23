import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsDate, IsString, Length } from 'class-validator';
import { User } from './user.entity';
import { Drive } from './drive.entity';
import { RecyclingCenter } from './recycling-center.entity';
import { Challenge } from './challenge.entity';
import { EventRegistration } from './event-registration.entity';
import { Contribution } from './contribution.entity';
import { Partnership } from './partnership.entity';

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

  @ManyToOne(() => Partnership, (partnership) => partnership.event)
  partnership: Partnership;

  @OneToOne(() => Drive, (drive) => drive.event)
  @JoinColumn()  // Ensure a column is created for the relationship
  drive: Drive;

  @ManyToOne(() => RecyclingCenter, (recyclingcenter) => recyclingcenter.event)
  @JoinColumn() 
  recyclingcenter: RecyclingCenter;

  @ManyToOne(() => Challenge , (challenge) => challenge.event)
  @JoinColumn() 
  challenge : Challenge ;

  @OneToMany(() => EventRegistration, (registration) => registration.event)
  registrations: EventRegistration[];

  @OneToMany(() => Contribution, (contribution) => contribution.event)
  contributions: Contribution[];

}
