import { Module } from '@nestjs/common';
import { PtCustomerService } from './pt_customer.service';
import { PtCustomerController } from './pt_customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PtCustomer } from 'output/entities/PtCustomer';
@Module({
  imports: [
    TypeOrmModule.forFeature([PtCustomer]), // Đăng ký entity ở đây
  ],

  providers: [PtCustomerService],
  controllers: [PtCustomerController],
})
export class PtCustomerModule {}
