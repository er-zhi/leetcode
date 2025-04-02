import { Injectable } from '@nestjs/common';
import { IBettingPort } from '../../domain/ports/betting.port';
import { BettingModel } from '../../domain/model/betting.model';
import { Kafka } from 'kafkajs';

@Injectable()
export class CreateBettingUseCase {
  private readonly kafka: Kafka;

  constructor(private readonly bettingPort: IBettingPort) {
    this.kafka = new Kafka({
      clientId: 'betting-service',
      brokers: ['localhost:9092'],
    });
  }

  async execute(userId: string, amount: number, eventId: string): Promise<BettingModel> {
    const betting = BettingModel.create(userId, amount, eventId);
    const savedBetting = await this.bettingPort.save(betting);

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