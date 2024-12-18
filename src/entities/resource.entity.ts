import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsUrl, Length } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(5, 100, {
    message: 'Resource name must be between 5 and 100 characters',
  })
  name: string;

  @Column()
  @IsUrl({}, { message: 'URL must be a valid URL' })
  url: string;

  @Column({ nullable: true })
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ManyToOne(() => User, (user) => user)
    user: User;
}
