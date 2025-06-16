import { Module } from '@nestjs/common';
import { AlldataService } from './pt_customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PtCustomer } from 'output/entities/PtCustomer';
import { AlldataController } from './pt_customer.controller';
@Module({
  imports: [
    TypeOrmModule.forFeature([PtCustomer]), // Đăng ký entity ở đây
  ],

  providers: [AlldataService],
  controllers: [AlldataController],
})
export class AlldataModule {}
