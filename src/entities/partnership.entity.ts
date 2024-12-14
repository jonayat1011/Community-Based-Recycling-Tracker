import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsDate, IsString, Length } from 'class-validator';
import { User } from './user.entity';

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
  user: User;
}
