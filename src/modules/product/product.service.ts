import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PtProduct } from 'output/entities/PtProduct';
import { Repository } from 'typeorm';

@Injectable()
export class PtProductService {
  constructor(
    @InjectRepository(PtProduct)
    private readonly ptProductRepo: Repository<PtProduct>,
  ) {}

  async findAll(skip = 0, take = 50): Promise<PtProduct[]> {
    return this.ptProductRepo.find({
      skip,
      take,
      order: { id: 'DESC' },
      relations: ['brand'],
    });
  }

  async findByField(
    field: keyof PtProduct,
    value: string,
  ): Promise<PtProduct[]> {
    const dateFields: (keyof PtProduct)[] = [
      'contractSign',
      'dateActive',
      'dateRenew',
      'lastestRenew',
      'lastInsightUpdate',
    ];

    const whereClause = dateFields.includes(field)
      ? { [field]: new Date(value) }
      : { [field]: value };

    return this.ptProductRepo.find({
      where: whereClause,
      relations: ['brand'],
    });
  }
  async search(keyword: string): Promise<PtProduct[]> {
    return this.ptProductRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .where('product.name LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('product.serial LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('product.contract LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('product.supplier LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('product.type LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('product.email LIKE :keyword', { keyword: `%${keyword}%` })
      .orWhere('product.note LIKE :keyword', { keyword: `%${keyword}%` })
      .getMany();
  }
}
