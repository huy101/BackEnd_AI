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

  async findAll(skip = 0, take = 50): Promise<PtCustomer[]> {
    return this.ptCustomerRepo.find({
      skip,
      take,
      order: { id: 'DESC' },
      relations: [
        'hubActivities',
        'hubContacts',
        'hubCustomerRes',
        'hubCustomerRes2',
        'status',
        'cat',
        'ptUseCases',
      ],
    });
  }
}
