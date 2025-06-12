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

  async findOne(id: number): Promise<PtCustomer | null> {
    return this.ptCustomerRepo.findOne({
      where: { id },
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

  async create(data: Partial<PtCustomer>): Promise<PtCustomer> {
    const newCustomer = this.ptCustomerRepo.create(data);
    return this.ptCustomerRepo.save(newCustomer);
  }

  async update(id: number, data: Partial<PtCustomer>): Promise<PtCustomer> {
    await this.ptCustomerRepo.update(id, data);
    const updatedCustomer = await this.findOne(id);
    if (!updatedCustomer) {
      throw new Error(`PtCustomer with id ${id} not found`);
    }
    return updatedCustomer;
  }

  async remove(id: number): Promise<void> {
    await this.ptCustomerRepo.delete(id);
  }
}
