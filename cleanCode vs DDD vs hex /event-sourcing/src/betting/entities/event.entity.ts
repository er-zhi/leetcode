import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  aggregateId: string;

  @Column()
  eventType: string;

  @Column('jsonb')
  data: any;

  @Column()
  version: number;

  @CreateDateColumn()
  timestamp: Date;
} 