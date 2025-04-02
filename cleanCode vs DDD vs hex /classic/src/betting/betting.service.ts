import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BettingEntity, BettingStatusEnum } from './entities/betting.entity';
import { CreateBettingDto } from './dto/create-betting.dto';
import { Redis } from 'redis';
import { Kafka } from 'kafkajs';

@Injectable()
export class BettingService {
  private readonly redis: Redis;
  private readonly kafka: Kafka;

  constructor(
    @InjectRepository(BettingEntity)
    private readonly bettingRepository: Repository<BettingEntity>,
  ) {
    this.redis = new Redis({
      host: 'localhost',
      port: 6379,
    });

    this.kafka = new Kafka({
      clientId: 'betting-service',
      brokers: ['localhost:9092'],
    });
  }

  async createBetting(createBettingDto: CreateBettingDto): Promise<BettingEntity> {
    const betting = this.bettingRepository.create(createBettingDto);
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
            userId: createBettingDto.userId,
            amount: createBettingDto.amount,
            bettingId: savedBetting.id,
          }),
        },
      ],
    });
    await producer.disconnect();

    return savedBetting;
  }

  async getAllBettings(): Promise<BettingEntity[]> {
    const cacheKey = 'all-bettings';
    const cachedBettings = await this.redis.get(cacheKey);

    if (cachedBettings) {
      return JSON.parse(cachedBettings);
    }

    const bettings = await this.bettingRepository.find();
    await this.redis.set(cacheKey, JSON.stringify(bettings), 'EX', 60);

    return bettings;
  }

  async updateBettingStatus(
    id: string,
    status: BettingStatusEnum,
  ): Promise<BettingEntity> {
    const betting = await this.bettingRepository.findOne({ where: { id } });
    if (!betting) {
      throw new Error('Betting not found');
    }

    betting.status = status;
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
} 