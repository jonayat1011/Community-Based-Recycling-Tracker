import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { MaterialLog } from './material.entity'; // Import MaterialLog entity
import  { Event } from './event.entity'; // Import Event entity
import { RecyclerEvent } from './event_recycler.entity'; // Import RecyclerEvent entity
import { User } from './user.entity';

@Entity('recycler')
export class Recycler {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({type: 'varchar',length: 255,nullable: true})
    email: string | null; 

    @Column()
    age: number;

    @Column()
    earning: number;

    @Column({ type: 'float', default: 0 })
    unpaidEarnings: number;
  
    @Column({ type: 'float', default: 0 })
    unpaidBonuses: number;
  
    @Column('json', { default: {} })
    dailyEarnings: Record<string, number>;
  
    @Column({ type: 'varchar', nullable: true })
    lastBonusClaimed: string | null;
  
    @Column({ type: 'int', nullable: true })
    lastBonusTypeClaimed: number | null;

    @Column({ type: 'int', nullable: true })
    lastBonusAmount: number;

    @Column({ nullable: true })
    lastBonusClaimedType: number;

    @Column({ type: 'float', default: 0 })
    wallet: number;

    @Column({ default: 0 })
    acceptEvents: number;

    @Column({ default: 0 })
    rejectEvents: number;

    @Column({ type: 'float', nullable: true })
    weight: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @Column({
        type: 'enum',
        enum: ['Admin', 'recycler', 'Organization', 'Citizen'],
        default: 'recycler',
      })
      role: string; // Update this to a string

    @Column('simple-json', { nullable: true })
    dailyProgress: { [key: string]: number };

    @Column({ nullable: true }) // Make it nullable because it won't always be set
    twofaSecret?: string;
    

    @OneToMany(() => MaterialLog, (materialLog) => materialLog.recycler)
    materialLogs: MaterialLog[];
    
    @OneToMany(() => Event, event => event.recycler)
    events: Event[]; // One Recycler can have many Events

    @OneToMany(() => RecyclerEvent, recyclerEvent => recyclerEvent.recycler)
    recyclerEvents: RecyclerEvent[]; // One Recycler can have many RecyclerEvents

    @ManyToOne(() => User, user => user.recyclers)
    user: User;
}
