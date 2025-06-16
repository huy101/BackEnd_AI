import { Controller, Get, Query } from '@nestjs/common';
import { PtCustomer } from 'output/entities/PtCustomer';
import { PtCustomerService } from './customer.service';

@Controller('pt-customer')
export class PtCustomerController {
  constructor(private readonly ptCustomerService: PtCustomerService) {}

  @Get()
  async findAll(
    @Query('skip') skip = '0',
    @Query('take') take = '50',
  ): Promise<PtCustomer[]> {
    return this.ptCustomerService.findAll(Number(skip), Number(take));
  }
}
