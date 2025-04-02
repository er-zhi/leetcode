import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BettingStatusEnum } from '../../../domain/model/betting.model';

@Entity('bettings')
export class BettingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  eventId: string;

  @Column({
    type: 'enum',
    enum: BettingStatusEnum,
    default: BettingStatusEnum.PENDING
  })
  status: BettingStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 