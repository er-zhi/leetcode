export enum BettingStatusEnum {
  PENDING = 'PENDING',
  WON = 'WON',
  CANCELLED = 'CANCELLED'
}

export class BettingStatusUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly status: BettingStatusEnum,
    public readonly timestamp: Date,
  ) {}
} 