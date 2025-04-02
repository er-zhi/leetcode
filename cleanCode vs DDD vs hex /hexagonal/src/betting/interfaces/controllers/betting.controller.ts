import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { CreateBettingUseCase } from '../../application/use-cases/create-betting.use-case';
import { BettingStatusEnum } from '../../domain/model/betting.model';

@Controller('bettings')
export class BettingController {
  constructor(private readonly createBettingUseCase: CreateBettingUseCase) {}

  @Post()
  async createBetting(
    @Body() body: { userId: string; amount: number; eventId: string },
  ) {
    return this.createBettingUseCase.execute(
      body.userId,
      body.amount,
      body.eventId,
    );
  }

  @Get()
  async getAllBettings() {
    // TODO: Implement GetAllBettingsUseCase
    return [];
  }

  @Put(':id/status')
  async updateBettingStatus(
    @Param('id') id: string,
    @Body('status') status: BettingStatusEnum,
  ) {
    // TODO: Implement UpdateBettingStatusUseCase
    return null;
  }
} 