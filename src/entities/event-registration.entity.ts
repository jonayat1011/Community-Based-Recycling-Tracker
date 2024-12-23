import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    CreateDateColumn,
    JoinColumn,
  } from 'typeorm';
  import { IsEnum } from 'class-validator';
  import { User } from './user.entity';
  import { Event } from './event.entity';
  
  @Entity()
  export class EventRegistration {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, (user) => user.eventRegistrations, { nullable: false })
    @JoinColumn()
    user: User;
  
    @ManyToOne(() => Event, (event) => event.registrations, { nullable: false })
    @JoinColumn()
    event: Event;
  
    @Column({ default: false })
    @IsEnum([true, false], { message: 'Check-in status must be a boolean value' })
    checkedIn: boolean;
  
    @CreateDateColumn()
    registrationDate: Date;
  }
  