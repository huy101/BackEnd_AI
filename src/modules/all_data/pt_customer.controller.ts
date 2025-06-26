import { Controller, Get } from '@nestjs/common';
import { PtCustomer } from 'output/entities/PtCustomer';
import { AlldataService } from './pt_customer.service';

@Controller('all_data')
export class AlldataController {
  constructor(private readonly AlldataService: AlldataService) {}
  @Get()
  async getAll(): Promise<PtCustomer[]> {
    return this.AlldataService.findAll();
  }
}
