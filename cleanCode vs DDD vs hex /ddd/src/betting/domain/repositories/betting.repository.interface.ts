import { BettingEntity } from '../entities/betting.entity';

export interface IBettingRepository {
  create(betting: BettingEntity): Promise<BettingEntity>;
  findById(id: string): Promise<BettingEntity | null>;
  findAll(): Promise<BettingEntity[]>;
  update(betting: BettingEntity): Promise<BettingEntity>;
} 