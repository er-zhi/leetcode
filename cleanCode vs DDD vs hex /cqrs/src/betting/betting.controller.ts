import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBettingCommand } from './commands/create-betting.command';
import { UpdateBettingStatusCommand } from './commands/update-betting-status.command';
import { GetAllBettingsQuery } from './queries/get-all-bettings.query';
import { BettingStatusEnum } from './entities/betting.entity';

@Controller('bettings')
export class BettingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createBetting(
    @Body() body: { userId: string; amount: number; eventId: string },
  ) {
    return this.commandBus.execute(
      new CreateBettingCommand(body.userId, body.amount, body.eventId),
    );
  }

  @Get()
  async getAllBettings() {
    return this.queryBus.execute(new GetAllBettingsQuery());
  }

  @Put(':id/status')
  async updateBettingStatus(
    @Param('id') id: string,
    @Body('status') status: BettingStatusEnum,
  ) {
    return this.commandBus.execute(
      new UpdateBettingStatusCommand(id, status),
    );
  }
} 