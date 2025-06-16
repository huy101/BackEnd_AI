import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PtProduct } from 'output/entities/PtProduct';
import { PtProductService } from './product.service';
import { PtProductController } from './product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PtProduct])],
  providers: [PtProductService],
  controllers: [PtProductController],
})
export class PtProductModule {}
