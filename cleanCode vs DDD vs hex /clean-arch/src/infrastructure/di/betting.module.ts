import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BettingController } from '../controllers/betting.controller';
import { CreateBettingUseCase } from '../../application/use-cases/create-betting.use-case';
import { TypeOrmBettingRepository } from '../persistence/typeorm-betting.repository';
import { BettingEntity } from '../persistence/betting.entity';
import { IBettingRepository } from '../../domain/repositories/betting.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([BettingEntity])],
  controllers: [BettingController],
  providers: [
    CreateBettingUseCase,
    {
      provide: IBettingRepository,
      useClass: TypeOrmBettingRepository,
    },
  ],
})
export class BettingModule {} 