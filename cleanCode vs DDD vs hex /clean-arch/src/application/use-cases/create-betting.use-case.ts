import { Betting } from '../../domain/entities/betting.entity';
import { IBettingRepository } from '../../domain/repositories/betting.repository.interface';
import { Kafka } from 'kafkajs';

export class CreateBettingUseCase {
  private readonly kafka: Kafka;

  constructor(
    private readonly bettingRepository: IBettingRepository,
  ) {
    this.kafka = new Kafka({
      clientId: 'betting-service',
      brokers: ['localhost:9092'],
    });
  }

  async execute(userId: string, amount: number, eventId: string): Promise<Betting> {
    const betting = Betting.create(userId, amount, eventId);
    const savedBetting = await this.bettingRepository.save(betting);

    // Publish event to Kafka for balance update
    const producer = this.kafka.producer();
    await producer.connect();
    await producer.send({
      topic: 'betting-events',
      messages: [
        {
          key: 'create-betting',
          value: JSON.stringify({
            userId,
            amount,
            bettingId: savedBetting.id,
          }),
        },
      ],
    });
    await producer.disconnect();

    return savedBetting;
  }
} 