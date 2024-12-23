import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Recycler } from '../recycler/recycler.entity';
import { Event } from '../recycler/event.entity';

@Entity()
export class RecyclerEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Recycler, recycler => recycler.recyclerEvents)
  recycler: Recycler;

  @ManyToOne(() => Event, event => event.recyclerEvents)
  event: Event;

  @Column({ type: "enum", enum: ["joined", "rejected", "pending"], default: "pending" })
  status: "joined" | "rejected" | "pending";
}
