import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PtCustomer } from 'output/entities/PtCustomer';
import { Repository } from 'typeorm';

@Injectable()
export class PtCustomerService {
  constructor(
    @InjectRepository(PtCustomer)
    private readonly ptCustomerRepo: Repository<PtCustomer>,
  ) {}

  findWithRelations({
    skip = 0,
    take = 50,
  }: {
    skip?: number;
    take?: number;
  }): Promise<PtCustomer[]> {
    return this.ptCustomerRepo
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.ptProducts', 'products')
      .leftJoinAndSelect('customer.hubProjects', 'projects')
      .orderBy('customer.id', 'DESC')
      .skip(skip)
      .take(take)
      .getMany();
  }
}
