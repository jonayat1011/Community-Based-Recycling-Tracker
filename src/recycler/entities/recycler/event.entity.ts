import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Recycler } from './recycler.entity';
import { RecyclerEvent } from './event_recycler.entity';
import { User } from './user.entity';
@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column('float')
  weight: number;

  @ManyToOne(() => Recycler, recycler => recycler.events)
  recycler: Recycler;

  @OneToMany(() => RecyclerEvent, recyclerEvent => recyclerEvent.event)
  recyclerEvents: RecyclerEvent[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
