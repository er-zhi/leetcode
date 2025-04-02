import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { BettingService } from '../application/services/betting.service';
import { BettingStatusEnum } from '../domain/entities/betting.entity';

@Controller('bettings')
export class BettingController {
  constructor(private readonly bettingService: BettingService) {}

  @Post()
  async createBetting(
    @Body() body: { userId: string; amount: number; eventId: string },
  ) {
    return this.bettingService.createBetting(
      body.userId,
      body.amount,
      body.eventId,
    );
  }

  @Get()
  async getAllBettings() {
    return this.bettingService.getAllBettings();
  }

  @Put(':id/status')
  async updateBettingStatus(
    @Param('id') id: string,
    @Body('status') status: BettingStatusEnum,
  ) {
    return this.bettingService.updateBettingStatus(id, status);
  }
} 