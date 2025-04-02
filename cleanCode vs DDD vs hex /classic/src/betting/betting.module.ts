import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BettingController } from './betting.controller';
import { BettingService } from './betting.service';
import { BettingEntity } from './entities/betting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BettingEntity])],
  controllers: [BettingController],
  providers: [BettingService],
})
export class BettingModule {} 