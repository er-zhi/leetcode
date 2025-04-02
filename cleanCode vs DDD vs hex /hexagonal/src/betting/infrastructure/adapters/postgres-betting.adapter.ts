import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBettingPort } from '../../domain/ports/betting.port';
import { BettingModel, BettingStatusEnum } from '../../domain/model/betting.model';
import { BettingEntity } from './entities/betting.entity';

@Injectable()
export class PostgresBettingAdapter implements IBettingPort {
  constructor(
    @InjectRepository(BettingEntity)
    private readonly repository: Repository<BettingEntity>,
  ) {}

  async save(betting: BettingModel): Promise<BettingModel> {
    const entity = this.toEntity(betting);
    const savedEntity = await this.repository.save(entity);
    return this.toModel(savedEntity);
  }

  async findById(id: string): Promise<BettingModel | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toModel(entity) : null;
  }

  async findAll(): Promise<BettingModel[]> {
    const entities = await this.repository.find();
    return entities.map(entity => this.toModel(entity));
  }

  async update(betting: BettingModel): Promise<BettingModel> {
    const entity = this.toEntity(betting);
    const updatedEntity = await this.repository.save(entity);
    return this.toModel(updatedEntity);
  }

  private toEntity(model: BettingModel): BettingEntity {
    const entity = new BettingEntity();
    entity.id = model.id;
    entity.userId = model.userId;
    entity.amount = model.amount;
    entity.eventId = model.eventId;
    entity.status = model.status;
    entity.createdAt = model.createdAt;
    entity.updatedAt = model.updatedAt;
    return entity;
  }

  private toModel(entity: BettingEntity): BettingModel {
    return new BettingModel(
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