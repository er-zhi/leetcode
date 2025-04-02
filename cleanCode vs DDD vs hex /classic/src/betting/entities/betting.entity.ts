import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum BettingStatusEnum {
  PENDING = 'PENDING',
  WON = 'WON',
  CANCELLED = 'CANCELLED'
}

@Entity('bettings')
export class BettingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: BettingStatusEnum,
    default: BettingStatusEnum.PENDING
  })
  status: BettingStatusEnum;

  @Column()
  eventId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 