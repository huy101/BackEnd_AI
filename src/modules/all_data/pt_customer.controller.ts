import { Controller, Get } from '@nestjs/common';
import { PtCustomer } from 'output/entities/PtCustomer';
import { AlldataService } from './pt_customer.service';

@Controller('all_data')
export class AlldataController {
  constructor(private readonly AlldataService: AlldataService) {}
  @Get()
  async getAll() // @Query('page') page: string = '1',
  // @Query('limit') limit: string = '50',
  : Promise<PtCustomer[]> {
    // const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    // const limitNumber = Math.min(parseInt(limit, 10) || 50, 100);
    // const skip = (pageNumber - 1) * limitNumber;

    return this.AlldataService.findAll();
  }

  // @Get('find')
  // findByField(
  //   @Query('field') field: keyof PtCustomer,
  //   @Query('value') value: string,
  // ): Promise<PtCustomer | null> {
  //   // Nếu là số thì parseInt
  //   const parsedValue = ['id', 'projectId', 'customerId'].includes(field)
  //     ? parseInt(value, 10)
  //     : value;

  //   return this.ptCustomerService.findOneByField(field, parsedValue);
  // }
}
