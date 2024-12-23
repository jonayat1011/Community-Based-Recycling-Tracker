import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { User } from './user.entity';
import { Event } from './event.entity';

export enum Type {
  Metalic = 'Metalic',
  Plastic = 'Plastic',
  Paper = 'Paper',

}

@Entity()
export class Contribution {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEnum(Type, {
      message: 'Invalid Material type',
    })
  materialType: Type;

  @Column('float')
  @IsNumber({}, { message: 'Quantity must be a number' })
  quantity: number;

  @ManyToOne(() => User, (user) => user.contributions)
  contributor: User;

  @ManyToOne(() => Event, (event) => event.contributions)
  event: Event;
}
