import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BettingController } from './betting.controller';
import { BettingService } from './services/betting.service';
import { EventStoreService } from './services/event-store.service';
import { BettingEntity } from './entities/betting.entity';
import { EventEntity } from './entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BettingEntity, EventEntity]),
  ],
  controllers: [BettingController],
  providers: [BettingService, EventStoreService],
})
export class BettingModule {} 