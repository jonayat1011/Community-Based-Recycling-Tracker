import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsNumber } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class Contribution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString({ message: 'Material type must be a string' })
  materialType: string;

  @Column('float')
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;

  @ManyToOne(() => User, (user) => user.contributions)
  contributor: User;
}
