import { Controller, Get, Query } from '@nestjs/common';
import { PtProductService } from './pt_product.service';
import { PtProduct } from 'output/entities/PtProduct';
import { FindManyOptions } from 'typeorm';

@Controller('pt-product')
export class PtProductController {
  constructor(private readonly ptProductService: PtProductService) {}

  @Get()
  async getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 50,
  ): Promise<PtProduct[]> {
    const take = Math.min(Number(limit) || 50, 100); // an toàn khi limit là chuỗi
    const skip = (Number(page) - 1) * take;
    const options: FindManyOptions<PtProduct> = {
      skip,
      take,
      order: { id: 'DESC' }, // gợi ý thêm: sắp xếp giảm dần theo ID
    };
    return this.ptProductService.find(options);
  }
}
