import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BettingModule } from './infrastructure/di/betting.module';
import { BettingEntity } from './infrastructure/persistence/betting.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'betting_db',
      entities: [BettingEntity],
      synchronize: true,
    }),
    BettingModule,
  ],
})
export class AppModule {} 