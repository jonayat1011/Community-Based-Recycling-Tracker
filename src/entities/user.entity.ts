import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsEmail, IsEnum, IsString, Length, IsBoolean } from 'class-validator';
import { Drive } from './drive.entity';
import { Partnership } from './partnership.entity';
import { Contribution } from './contribution.entity';
import { Event } from './event.entity';
import { Notification } from './notification.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Column()
  @IsEnum(['Admin', 'Recycler', 'Organization', 'Citizen'], {
    message: 'Invalid role',
  })
  role: string;

  @Column()
  @IsString()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  password: string;

  @Column({ default: true })
  @IsBoolean({ message: 'isActive must be a boolean value' })
  isActive: boolean;

  @OneToMany(() => Drive, (drive) => drive.organizer)
  drives: Drive[];

  @OneToMany(() => Partnership, (partnership) => partnership.hostUser)
  partnerships: Partnership[];

  @OneToMany(() => Contribution, (contribution) => contribution.contributor)
  contributions: Contribution[];

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @OneToMany(() => Notification, (notification) => notification.fromUser)
  notifications: Notification[];
}
