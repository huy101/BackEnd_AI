import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ticketsService } from './tickets.service';
import { HubProject } from 'output/entities/HubProject';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: ticketsService) {}

  @Get('/tickets/list')
  @ApiQuery({
    name: 'status',
    required: false,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Số bản ghi bỏ qua',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Số bản ghi lấy ra',
  })
  async getTicketsByStatus(@Query('status') status?: string) {
    return this.ticketsService.getTicketsByStatus(status);
  }
}
