import { Controller, Get, Query } from '@nestjs/common';
import { PtCustomer } from 'output/entities/PtCustomer';
import { PtCustomerService } from './pt_customer.service';

@Controller('pt-customer')
export class PtCustomerController {
  constructor(private readonly ptCustomerService: PtCustomerService) {}

  @Get()
  async getAll() // @Query('page') page: string = '1',
  // @Query('limit') limit: string = '50',
  : Promise<PtCustomer[]> {
    // const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    // const limitNumber = Math.min(parseInt(limit, 10) || 50, 100);
    // const skip = (pageNumber - 1) * limitNumber;

    return this.ptCustomerService.findAll();
  }
}
