import { Betting, BettingStatusEnum } from '../entities/betting.entity';

export interface IBettingRepository {
  save(betting: Betting): Promise<Betting>;
  findById(id: string): Promise<Betting | null>;
  findAll(): Promise<Betting[]>;
  updateStatus(id: string, status: BettingStatusEnum): Promise<Betting>;
} 