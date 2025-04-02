import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BettingEntity } from '../../domain/entities/betting.entity';
import { IBettingRepository } from '../../domain/repositories/betting.repository.interface';

@Injectable()
export class BettingRepository implements IBettingRepository {
  constructor(
    @InjectRepository(BettingEntity)
    private readonly repository: Repository<BettingEntity>,
  ) {}

  async create(betting: BettingEntity): Promise<BettingEntity> {
    return this.repository.save(betting);
  }

  async findById(id: string): Promise<BettingEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<BettingEntity[]> {
    return this.repository.find();
  }

  async update(betting: BettingEntity): Promise<BettingEntity> {
    return this.repository.save(betting);
  }
} 