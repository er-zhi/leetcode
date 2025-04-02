export class BettingCreatedEvent {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly amount: number,
    public readonly eventId: string,
    public readonly timestamp: Date,
  ) {}
} 