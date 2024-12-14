import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class Reward {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: 'Reward type must be a string' })
  rewardType: string;

  @Column('float')
  @IsNumber({}, { message: 'Points must be a number' })
  points: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
