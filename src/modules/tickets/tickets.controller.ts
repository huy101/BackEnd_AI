import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ticketsService } from './tickets.service';

@ApiTags('tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: ticketsService) {}

  @Get('/tickets/list')
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'name', required: false })
  getTicketsByStatus(
    @Query('status') status: string,
    @Query('name') name: string,
    @Query('skip') skip: string = '0',
    @Query('take') take: string = '20',
  ) {
    const parsedSkip = Number.isNaN(Number(skip)) ? 0 : Number(skip);
    const parsedTake = Number.isNaN(Number(take)) ? 20 : Number(take);
    return this.ticketsService.getTicketsByStatus(
      status,
      parsedSkip,
      parsedTake,
      name,
    );
  }
}
