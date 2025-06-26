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

  @Get('/:name/customers')
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  getProductsWithCustomer(
    @Query('name') name: string,
    @Query('skip') skip: string = '0',
    @Query('take') take: string = '20',
  ) {
    const parsedSkip = Number.isNaN(Number(skip)) ? 0 : Number(skip);
    const parsedTake = Number.isNaN(Number(take)) ? 20 : Number(take);

    return this.ptProductService.findProductsWithCustomerByName(
      name,
      parsedSkip,
      parsedTake,
    );
  }

  @Get('/list_products')
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
  getProducts(@Query('skip') skip = '0', @Query('take') take = '20') {
    return this.ptProductService.findListProducts(Number(skip), Number(take));
  }
  // @Get('overview')
  // getProductOverview(@Query('id') id: number) {
  //   return this.ptProductService.getOverviewByName(id);
  // }

  // API 2: GET /products/:id/detail
  @Get(':id/detail')
  getProductDetail(@Query('id') id: number) {
    return this.ptProductService.getDetailById(Number(id));
  }
}
