import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Betting, BettingStatusEnum } from '../../../domain/entities/betting.entity';
import { IBettingRepository } from '../../../domain/repositories/betting.repository.interface';
import { BettingEntity } from './betting.entity';

@Injectable()
export class TypeOrmBettingRepository implements IBettingRepository {
  constructor(
    @InjectRepository(BettingEntity)
    private readonly repository: Repository<BettingEntity>,
  ) {}

  async save(betting: Betting): Promise<Betting> {
    const entity = this.toEntity(betting);
    const savedEntity = await this.repository.save(entity);
    return this.toDomain(savedEntity);
  }

  async findById(id: string): Promise<Betting | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findAll(): Promise<Betting[]> {
    const entities = await this.repository.find();
    return entities.map(entity => this.toDomain(entity));
  }

  async updateStatus(id: string, status: BettingStatusEnum): Promise<Betting> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new Error('Betting not found');
    }
    entity.status = status;
    entity.updatedAt = new Date();
    const updatedEntity = await this.repository.save(entity);
    return this.toDomain(updatedEntity);
  }

  private toEntity(domain: Betting): BettingEntity {
    const entity = new BettingEntity();
    entity.id = domain.id;
    entity.userId = domain.userId;
    entity.amount = domain.amount;
    entity.eventId = domain.eventId;
    entity.status = domain.status;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }

  private toDomain(entity: BettingEntity): Betting {
    return new Betting(
      entity.id,
      entity.userId,
      entity.amount,
      entity.eventId,
      entity.status,
      entity.createdAt,
      entity.updatedAt,
    );
  }
} 