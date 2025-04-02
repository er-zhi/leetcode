import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { UpdateBettingStatusCommand } from '../commands/update-betting-status.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BettingEntity } from '../entities/betting.entity';
import { Kafka } from 'kafkajs';

@CommandHandler(UpdateBettingStatusCommand)
export class UpdateBettingStatusHandler implements ICommandHandler<UpdateBettingStatusCommand> {
  private readonly kafka: Kafka;

  constructor(
    @InjectRepository(BettingEntity)
    private readonly repository: Repository<BettingEntity>,
    private readonly eventBus: EventBus,
  ) {
    this.kafka = new Kafka({
      clientId: 'betting-service',
      brokers: ['localhost:9092'],
    });
  }

  async execute(command: UpdateBettingStatusCommand): Promise<void> {
    const betting = await this.repository.findOne({ where: { id: command.id } });
    if (!betting) {
      throw new Error('Betting not found');
    }

    betting.status = command.status;
    betting.updatedAt = new Date();
    await this.repository.save(betting);

    // Publish event to Kafka for balance update if won
    if (command.status === 'WON') {
      const producer = this.kafka.producer();
      await producer.connect();
      await producer.send({
        topic: 'betting-events',
        messages: [
          {
            key: 'win-betting',
            value: JSON.stringify({
              userId: betting.userId,
              amount: betting.amount,
              bettingId: betting.id,
            }),
          },
        ],
      });
      await producer.disconnect();
    }
  }
} 