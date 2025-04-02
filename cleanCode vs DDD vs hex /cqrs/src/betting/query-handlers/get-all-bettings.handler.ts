import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetAllBettingsQuery } from '../queries/get-all-bettings.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BettingEntity } from '../entities/betting.entity';
import { Redis } from 'redis';

@QueryHandler(GetAllBettingsQuery)
export class GetAllBettingsHandler implements IQueryHandler<GetAllBettingsQuery> {
  private readonly redis: Redis;

  constructor(
    @InjectRepository(BettingEntity)
    private readonly repository: Repository<BettingEntity>,
  ) {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async execute(): Promise<BettingEntity[]> {
    const cacheKey = 'all-bettings';
    const cachedBettings = await this.redis.get(cacheKey);

    if (cachedBettings) {
      return JSON.parse(cachedBettings);
    }

    const bettings = await this.repository.find();
    await this.redis.set(cacheKey, JSON.stringify(bettings), 'EX', 60);

    return bettings;
  }
} 