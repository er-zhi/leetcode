import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { CreateBettingCommand } from '../commands/create-betting.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BettingEntity } from '../entities/betting.entity';
import { Kafka } from 'kafkajs';

@CommandHandler(CreateBettingCommand)
export class CreateBettingHandler implements ICommandHandler<CreateBettingCommand> {
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

  async execute(command: CreateBettingCommand): Promise<void> {
    const betting = this.repository.create({
      userId: command.userId,
      amount: command.amount,
      eventId: command.eventId,
    });

    const savedBetting = await this.repository.save(betting);

    // Publish event to Kafka for balance update
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic: 'betting-events',
      messages: [
        {
          key: 'create-betting',
          value: JSON.stringify({
            userId: command.userId,
            amount: command.amount,
            bettingId: savedBetting.id,
          }),
        },
      ],
    });
    await producer.disconnect();
  }
} 