export enum BettingStatusEnum {
  PENDING = 'PENDING',
  WON = 'WON',
  CANCELLED = 'CANCELLED'
}

export class Betting {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly amount: number,
    public readonly eventId: string,
    public status: BettingStatusEnum,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(
    userId: string,
    amount: number,
    eventId: string,
  ): Betting {
    const now = new Date();
    return new Betting(
      crypto.randomUUID(),
      userId,
      amount,
      eventId,
      BettingStatusEnum.PENDING,
      now,
      now,
    );
  }

  updateStatus(status: BettingStatusEnum): void {
    this.status = status;
    this.updatedAt = new Date();
  }
} 