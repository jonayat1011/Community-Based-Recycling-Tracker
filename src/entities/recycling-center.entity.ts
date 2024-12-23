import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { IsString, Length, IsNumber, IsUrl } from 'class-validator';
import { Event } from './event.entity';

@Entity()
export class RecyclingCenter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(5, 100, { message: 'Name must be between 5 and 100 characters' })
  name: string;

  @Column()
  @IsString()
  @Length(10, 200, { message: 'Address must be between 10 and 200 characters' })
  address: string;

  @Column()
  @IsString()
  @Length(10, 20, {
    message: 'Contact number must be between 10 and 20 characters',
  })
  contactNumber: string;

  @Column({ nullable: true })
  @IsUrl({}, { message: 'Website URL must be a valid URL' })
  website: string;

  @Column('float')
  @IsNumber({}, { message: 'Latitude must be a number' })
  latitude: number;

  @Column('float')
  @IsNumber({}, { message: 'Longitude must be a number' })
  longitude: number;

  @OneToMany(() => Event, (event) => event.drive)
  @JoinColumn()  // Ensure a column is created for the relationship
  event: Event;
}
