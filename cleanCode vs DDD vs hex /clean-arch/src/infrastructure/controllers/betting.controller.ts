import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { CreateBettingUseCase } from '../../application/use-cases/create-betting.use-case';
import { IBettingRepository } from '../../domain/repositories/betting.repository.interface';
import { BettingStatusEnum } from '../../domain/entities/betting.entity';

@Controller('bettings')
export class BettingController {
  constructor(
    private readonly createBettingUseCase: CreateBettingUseCase,
    private readonly bettingRepository: IBettingRepository,
  ) {}

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
    return this.bettingRepository.findAll();
  }

  @Put(':id/status')
  async updateBettingStatus(
    @Param('id') id: string,
    @Body('status') status: BettingStatusEnum,
  ) {
    return this.bettingRepository.updateStatus(id, status);
  }
} 