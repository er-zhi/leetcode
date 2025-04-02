import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { BettingCreatedEvent } from '../events/betting-created.event';
import { BettingStatusUpdatedEvent } from '../events/betting-status-updated.event';

@Injectable()
export class EventStoreService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  async saveEvent(event: BettingCreatedEvent | BettingStatusUpdatedEvent): Promise<void> {
    const eventEntity = new EventEntity();
    eventEntity.aggregateId = event.id;
    eventEntity.eventType = event.constructor.name;
    eventEntity.data = event;
    eventEntity.version = await this.getNextVersion(event.id);
    eventEntity.timestamp = event.timestamp;

    await this.eventRepository.save(eventEntity);
  }

  async getEvents(aggregateId: string): Promise<EventEntity[]> {
    return this.eventRepository.find({
      where: { aggregateId },
      order: { version: 'ASC' },
    });
  }

  private async getNextVersion(aggregateId: string): Promise<number> {
    const lastEvent = await this.eventRepository.findOne({
      where: { aggregateId },
      order: { version: 'DESC' },
    });

    return lastEvent ? lastEvent.version + 1 : 1;
  }
} 