import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { BettingService } from './betting.service';
import { CreateBettingDto } from './dto/create-betting.dto';
import { BettingStatusEnum } from './entities/betting.entity';

@Controller('bettings')
export class BettingController {
  constructor(private readonly bettingService: BettingService) {}

  @Post()
  async createBetting(@Body() createBettingDto: CreateBettingDto) {
    return this.bettingService.createBetting(createBettingDto);
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