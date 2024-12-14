import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { IsBoolean, IsDate } from 'class-validator';
import { User } from './user.entity';
import { Challenge } from './challenge.entity';

@Entity()
export class ChallengeParticipation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  participant: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.participations)
  challenge: Challenge;

  @Column({ default: false })
  @IsBoolean({ message: 'Completed must be a boolean value' })
  completed: boolean;

  @Column({ nullable: true })
  @IsDate({ message: 'Completion date must be a valid date' })
  completionDate: Date;
}
