// app.module.ts
import { Module } from '@nestjs/common';
import { PtCustomerController } from './customer.controller';
import { PtCustomer } from 'output/entities/PtCustomer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PtCustomerService } from './customer.service';

// pt-customer.module.ts
@Module({
  imports: [TypeOrmModule.forFeature([PtCustomer])],
  providers: [PtCustomerService],
  controllers: [PtCustomerController],
})
export class PtCustomerModule {}
