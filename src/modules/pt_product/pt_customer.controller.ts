import { Controller, Get, Query } from '@nestjs/common';
import { PtCustomer } from 'output/entities/PtCustomer';
import { PtCustomerService } from './pt_customer.service';

@Controller('pt-product') // <-- nên đổi lại tên nếu đây là PtCustomerController
export class PtCustomerController {
  constructor(private readonly ptCustomerService: PtCustomerService) {}

  @Get()
  async getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ): Promise<PtCustomer[]> {
    const take = Math.min(Number(limit) || 50, 100);
    const skip = (Number(page) - 1) * take;

    return this.ptCustomerService.findWithRelations({ skip, take });
  }
}
