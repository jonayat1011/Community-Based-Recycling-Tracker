import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsString, Length, IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ChallengeParticipation } from './challenge-participation.entity';

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(5, 100)
  title: string;

  @Column('text')
  @IsString()
  description: string;

  @Column()
  @IsDateString()
  @Type(() => Date)
  startDate: Date;

  @Column()
  @IsDateString()
  @Type(() => Date)
  endDate: Date;

  @Column('float')
  @IsNumber()
  rewardPoints: number;

  @OneToMany(
    () => ChallengeParticipation,
    (participation) => participation.challenge,
  )
  participations: ChallengeParticipation[];
}
