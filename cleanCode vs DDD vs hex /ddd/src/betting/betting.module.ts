import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BettingController } from './interfaces/betting.controller';
import { BettingService } from './application/services/betting.service';
import { BettingRepository } from './infrastructure/repositories/betting.repository';
import { BettingEntity } from './domain/entities/betting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BettingEntity]),
  ],
  controllers: [BettingController],
  providers: [
    BettingService,
    {
      provide: 'IBettingRepository',
      useClass: BettingRepository,
    },
  ],
})
export class BettingModule {} 