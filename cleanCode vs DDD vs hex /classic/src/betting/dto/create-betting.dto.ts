import { IsString, IsNumber, IsPositive, IsEnum } from 'class-validator';
import { BettingStatusEnum } from '../entities/betting.entity';

export class CreateBettingDto {
  @IsString()
  userId: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  eventId: string;

  @IsEnum(BettingStatusEnum)
  status: BettingStatusEnum;
} 