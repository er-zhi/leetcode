import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { BettingModule } from './betting/betting.module';
import { BettingEntity } from './betting/entities/betting.entity';

@Module({
  imports: [
    CqrsModule,
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