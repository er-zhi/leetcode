import { Injectable } from '@nestjs/common';
import { IBettingRepository } from '../../domain/repositories/betting.repository.interface';
import { BettingEntity, BettingStatusEnum } from '../../domain/entities/betting.entity';
import { Kafka } from 'kafkajs';

@Injectable()
export class BettingService {
  private readonly kafka: Kafka;

  constructor(
    private readonly bettingRepository: IBettingRepository,
  ) {
    this.kafka = new Kafka({
      clientId: 'betting-service',
      brokers: ['localhost:9092'],
    });
  }

  async createBetting(userId: string, amount: number, eventId: string): Promise<BettingEntity> {
    const betting = new BettingEntity();
    betting.id = crypto.randomUUID();
    betting.userId = userId;
    betting.amount = amount;
    betting.eventId = eventId;
    betting.status = BettingStatusEnum.PENDING;
    betting.createdAt = new Date();
    betting.updatedAt = new Date();

    const savedBetting = await this.bettingRepository.create(betting);

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

  async updateBettingStatus(id: string, status: BettingStatusEnum): Promise<BettingEntity> {
    const betting = await this.bettingRepository.findById(id);
    if (!betting) {
      throw new Error('Betting not found');
    }

    betting.status = status;
    betting.updatedAt = new Date();
    const updatedBetting = await this.bettingRepository.update(betting);

    // Publish event to Kafka for balance update if won
    if (status === BettingStatusEnum.WON) {
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

    return updatedBetting;
  }

  async getAllBettings(): Promise<BettingEntity[]> {
    return this.bettingRepository.findAll();
  }
} 