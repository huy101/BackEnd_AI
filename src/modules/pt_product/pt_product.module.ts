import { Module } from '@nestjs/common';
import { PtProductService } from './pt_product.service';
import { PtProductController } from './pt_product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PtProduct } from 'output/entities/PtProduct';
@Module({
  imports: [
    TypeOrmModule.forFeature([PtProduct]), // Đăng ký entity ở đây
  ],

  providers: [PtProductService],
  controllers: [PtProductController],
})
export class PtProductModule {}
