import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HubProject } from 'output/entities/HubProject';
import { ticketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HubProject])],
  providers: [ticketsService],
  controllers: [TicketsController],
})
export class ticketsModule {}
