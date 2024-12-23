import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Recycler } from './recycler.entity';

@Entity('material_logs')
export class MaterialLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'varchar', length: 100 })
  materialType: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @ManyToOne(() => Recycler, (recycler) => recycler.materialLogs)
  recycler: Recycler;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
