import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { PtCustomerService } from './customer.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('pt-customer')
export class PtCustomerController {
  service: any;
  constructor(private readonly ptCustomerService: PtCustomerService) {}

  @Get('overview')
  getOverviewByName(@Query('name') name: string) {
    return this.ptCustomerService.getOverviewByName(name);
  }
  @Get('/list_customers')
  findCustomerListnoquerry(
    @Query('skip') skip = '0',
    @Query('take') take = '20',
  ) {
    return this.ptCustomerService.findListByNameNoQuery(
      Number(skip),
      Number(take),
    );
  }
  @Get('/list_customers/:key')
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
  @ApiQuery({
    name: 'key',
    required: false,
    type: String,
    description: 'Tìm theo tên khách hàng (LIKE)',
  })
  findCustomerList(
    @Query('skip') skip = '0',
    @Query('take') take = '20',
    @Query('key') key?: string,
  ) {
    return this.ptCustomerService.findListByName(
      Number(skip),
      Number(take),
      key,
    );
  }

  @Get('/customers/detail')
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID của khách hàng',
  })
  getCustomerDetail(@Query('id', ParseIntPipe) id: number) {
    return this.ptCustomerService.findDetailById(id);
  }
  @Get('/customers/projects')
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID của khách hàng',
  })
  getProjectsByCustomerId(@Query('id', ParseIntPipe) id: number) {
    return this.ptCustomerService.findProjectsByCustomerId(id);
  }
  @Get('/customers/contacts')
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID của khách hàng',
  })
  getContacts(@Query('id', ParseIntPipe) id: number) {
    return this.ptCustomerService.findContactsByCustomerId(id);
  }
  @Get('/customers/products')
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID của khách hàng',
  })
  getCustomerProducts(@Query('id', ParseIntPipe) id: number) {
    return this.ptCustomerService.findProductsByCustomerId(id);
  }
  // controller.ts
  @Get('customer/activities')
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID của khách hàng để lấy hoạt động',
  })
  async getActivitiesByCustomer(@Query('id', ParseIntPipe) id: number) {
    return this.ptCustomerService.getActivitiesByCustomer(id);
  }
  @Get(':id/tickets')
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: 'ID của khách hàng để lấy hoạt động',
  })
  getCustomerTickets(@Query('id', ParseIntPipe) id: number) {
    return this.ptCustomerService.getCustomerTickets(id);
  }
}
