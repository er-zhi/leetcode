import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BettingModule } from './betting/betting.module';
import { BettingEntity } from './betting/entities/betting.entity';
import { EventEntity } from './betting/entities/event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'betting_db',
      entities: [BettingEntity, EventEntity],
      synchronize: true,
    }),
    BettingModule,
  ],
})
export class AppModule {} 