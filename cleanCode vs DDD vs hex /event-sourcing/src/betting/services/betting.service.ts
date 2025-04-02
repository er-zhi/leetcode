import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BettingEntity } from '../entities/betting.entity';
import { EventStoreService } from './event-store.service';
import { BettingCreatedEvent } from '../events/betting-created.event';
import { BettingStatusUpdatedEvent, BettingStatusEnum } from '../events/betting-status-updated.event';
import { Kafka } from 'kafkajs';

@Injectable()
export class BettingService {
  private readonly kafka: Kafka;

  constructor(
    @InjectRepository(BettingEntity)
    private readonly bettingRepository: Repository<BettingEntity>,
    private readonly eventStore: EventStoreService,
  ) {
    this.kafka = new Kafka({
      clientId: 'betting-service',
      brokers: ['localhost:9092'],
    });
  }

  async createBetting(userId: string, amount: number, eventId: string): Promise<BettingEntity> {
    const bettingId = crypto.randomUUID();
    const event = new BettingCreatedEvent(
      bettingId,
      userId,
      amount,
      eventId,
      new Date(),
    );

    await this.eventStore.saveEvent(event);

    const betting = this.bettingRepository.create({
      id: bettingId,
      userId,
      amount,
      eventId,
      status: BettingStatusEnum.PENDING,
    });

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

  async updateBettingStatus(id: string, status: BettingStatusEnum): Promise<BettingEntity> {
    const event = new BettingStatusUpdatedEvent(id, status, new Date());
    await this.eventStore.saveEvent(event);

    const betting = await this.bettingRepository.findOne({ where: { id } });
    if (!betting) {
      throw new Error('Betting not found');
    }

    betting.status = status;
    betting.updatedAt = new Date();
    const updatedBetting = await this.bettingRepository.save(betting);

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
    return this.bettingRepository.find();
  }

  async rebuildBettingState(id: string): Promise<BettingEntity> {
    const events = await this.eventStore.getEvents(id);
    const betting = new BettingEntity();

    for (const event of events) {
      if (event.eventType === 'BettingCreatedEvent') {
        const data = event.data as BettingCreatedEvent;
        betting.id = data.id;
        betting.userId = data.userId;
        betting.amount = data.amount;
        betting.eventId = data.eventId;
        betting.status = BettingStatusEnum.PENDING;
        betting.createdAt = data.timestamp;
      } else if (event.eventType === 'BettingStatusUpdatedEvent') {
        const data = event.data as BettingStatusUpdatedEvent;
        betting.status = data.status;
        betting.updatedAt = data.timestamp;
      }
    }

    return betting;
  }
} 