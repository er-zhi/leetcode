import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BettingController } from './interfaces/controllers/betting.controller';
import { CreateBettingUseCase } from './application/use-cases/create-betting.use-case';
import { PostgresBettingAdapter } from './infrastructure/adapters/postgres-betting.adapter';
import { BettingEntity } from './infrastructure/adapters/entities/betting.entity';
import { IBettingPort } from './domain/ports/betting.port';

@Module({
  imports: [
    TypeOrmModule.forFeature([BettingEntity]),
  ],
  controllers: [BettingController],
  providers: [
    CreateBettingUseCase,
    {
      provide: IBettingPort,
      useClass: PostgresBettingAdapter,
    },
  ],
})
export class BettingModule {} 