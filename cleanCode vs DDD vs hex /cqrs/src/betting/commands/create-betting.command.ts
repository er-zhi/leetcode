import { ICommand } from '@nestjs/cqrs';

export class CreateBettingCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly amount: number,
    public readonly eventId: string,
  ) {}
} 