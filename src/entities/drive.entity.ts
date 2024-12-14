import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsDate, IsString, Length } from 'class-validator';
import { User } from './user.entity';

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
}
