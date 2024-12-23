import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index } from 'typeorm';
import { User } from './user.entity';
import { IsEnum } from 'class-validator';

export enum NotificationType {
  PartnershipRequest = 'PartnershipRequest',
  EventRequest = 'EventRequest',
  PartnershipConfirmed = 'PartnershipConfirmed',
  EventConfirmed = 'EventConfirmed',
  NewEvent = 'NewEvent',
}


@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  @IsEnum(NotificationType, {
    message: 'Invalid notification type',
  })
  type: NotificationType;

  @Column({ nullable: true })
  entityId: number; 

  @ManyToOne(() => User, (user) => user.notifications)
  @Index()
  fromUser: User; // Sender of the notification
  @ManyToOne(() => User, (user) => user.notifications)
  @Index()
  toUser: User; 

  @Column({ default: false })
  @Index()
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expiryDate: Date; // Optional expiry date for the notification
}
