import { BettingModel } from '../model/betting.model';

export interface IBettingPort {
  save(betting: BettingModel): Promise<BettingModel>;
  findById(id: string): Promise<BettingModel | null>;
  findAll(): Promise<BettingModel[]>;
  update(betting: BettingModel): Promise<BettingModel>;
} 