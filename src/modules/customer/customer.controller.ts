import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { PtCustomerService } from './customer.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('pt-customer')
export class PtCustomerController {
  service: any;
  constructor(private readonly ptCustomerService: PtCustomerService) {}

  @Get('/list_customers/:key') // dùng `?` nếu key là optional
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({
    name: 'key',
    required: false,
    type: String,
    description: 'Tìm theo tên khách hàng (LIKE)',
  })
  @ApiQuery({
    name: 'fields',
    required: false,
    type: String,
    description: 'Lọc theo fields',
  })
  @ApiQuery({
    name: 'assignedUserName',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'cityName',
    required: false,
    type: String,
    description: 'Lọc theo tên thành phố (City.name LIKE)',
  })
  @ApiQuery({
    name: 'fields',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'statusName',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'lastUpdate',
    required: false,
    type: String,
  })
  findCustomerList(
    @Query('skip') skip: string = '0',
    @Query('take') take: string = '20',
    @Query('key') key?: string,
    @Query('assignedUserName') assignedUserName?: string,
    @Query('cityName') cityName?: string,
    @Query('fields') fields?: string,
    @Query('statusName') statusName?: string,
    @Query('lastUpdate') lastUpdate?: string,
  ) {
    const parsedSkip = Number.isNaN(Number(skip)) ? 0 : Number(skip);
    const parsedTake = Number.isNaN(Number(take)) ? 20 : Number(take);
    return this.ptCustomerService.findListByName(
      parsedSkip,
      parsedTake,
      key,
      assignedUserName,
      cityName,
      fields,
      statusName,
      lastUpdate,
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
