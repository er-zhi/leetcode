import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { BettingController } from './betting.controller';
import { BettingEntity } from './entities/betting.entity';
import { CreateBettingHandler } from './command-handlers/create-betting.handler';
import { UpdateBettingStatusHandler } from './command-handlers/update-betting-status.handler';
import { GetAllBettingsHandler } from './query-handlers/get-all-bettings.handler';

const CommandHandlers = [CreateBettingHandler, UpdateBettingStatusHandler];
const QueryHandlers = [GetAllBettingsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([BettingEntity]),
  ],
  controllers: [BettingController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class BettingModule {} 