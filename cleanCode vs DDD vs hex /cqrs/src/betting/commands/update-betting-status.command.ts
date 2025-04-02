import { ICommand } from '@nestjs/cqrs';
import { BettingStatusEnum } from '../entities/betting.entity';

export class UpdateBettingStatusCommand implements ICommand {
  constructor(
    public readonly id: string,
    public readonly status: BettingStatusEnum,
  ) {}
} 