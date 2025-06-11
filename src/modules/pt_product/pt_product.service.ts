import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PtProduct } from 'output/entities/PtProduct';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class PtProductService {
  constructor(
    @InjectRepository(PtProduct)
    private readonly ptProductRepo: Repository<PtProduct>,
  ) {}

  find(options: FindManyOptions<PtProduct> = {}): Promise<PtProduct[]> {
    return this.ptProductRepo.find(options);
  }
}
