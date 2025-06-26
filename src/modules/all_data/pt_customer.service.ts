import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PtCustomer } from 'output/entities/PtCustomer';
import { Repository } from 'typeorm';

@Injectable()
export class AlldataService {
  constructor(
    @InjectRepository(PtCustomer)
    private readonly AlldataRepo: Repository<PtCustomer>,
  ) {}

  async findAll(skip = 0, take = 400): Promise<PtCustomer[]> {
    return this.AlldataRepo.find({
      skip,
      take,
      order: { id: 'DESC' },
      relations: [
        'hubActivities',
        'hubContacts',
        'hubCustomerRes',
        'hubCustomerRes2',
        'hubListCustomers',
        'hubLogs',
        'hubProjects',
        'hubWorkingTasks',
        'ownerCustomer',
        'ptCustomers',
        'status',
        'cat',
        'ptProducts',
        'ptRooms',
        'ptSuppliers',
        'ptUseCases',
      ],
    });
  }

  // async findOne<PtCustomer>(
  //   field: keyof PtCustomer,
  //   value: string | number,
  // ): Promise<PtCustomer | null> {
  //   return this.ptCustomerRepo.findOne({
  //     where: { [field]: value },
  //     relations: [
  //       'hubActivities',
  //       'hubContacts',
  //       'hubCustomerRes',
  //       'hubCustomerRes2',
  //       'hubListCustomers',
  //       'hubLogs',
  //       'hubProjects',
  //       'hubWorkingTasks',
  //       'ownerCustomer',
  //       'ptCustomers',
  //       'status',
  //       'cat',
  //       'ptProducts',
  //       'ptRooms',
  //       'ptSuppliers',
  //       'ptUseCases',
  //     ],
  //   });
  // }
}
