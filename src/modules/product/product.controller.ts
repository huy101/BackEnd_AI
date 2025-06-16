import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PtProduct } from 'output/entities/PtProduct';
import { PtProductService } from './product.service';

@ApiTags('pt-product')
@Controller('pt-product')
export class PtProductController {
  constructor(private readonly ptProductService: PtProductService) {}

  @Get()
  async getAll(): Promise<PtProduct[]> {
    return this.ptProductService.findAll();
  }

  @Get('find')
  @ApiQuery({
    name: 'field',
    required: true,
    type: String,
    description: 'Tên trường cần tìm (vd: name, serial, email, ...)',
  })
  @ApiQuery({
    name: 'value',
    required: true,
    type: String,
    description: 'Giá trị cần tìm kiếm',
  })
  async findByField(
    @Query('field') field: keyof PtProduct,
    @Query('value') value: string,
  ): Promise<PtProduct[]> {
    return this.ptProductService.findByField(field, value);
  }
  @Get('search')
  async search(@Query('q') q: string): Promise<PtProduct[]> {
    return this.ptProductService.search(q);
  }
}
