export enum BettingStatusEnum {
  PENDING = 'PENDING',
  WON = 'WON',
  CANCELLED = 'CANCELLED'
}

export class BettingModel {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly amount: number,
    public readonly eventId: string,
    public status: BettingStatusEnum,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  static create(userId: string, amount: number, eventId: string): BettingModel {
    return new BettingModel(
      crypto.randomUUID(),
      userId,
      amount,
      eventId,
      BettingStatusEnum.PENDING,
      new Date(),
      new Date(),
    );
  }

  updateStatus(status: BettingStatusEnum): void {
    this.status = status;
    this.updatedAt = new Date();
  }
} 