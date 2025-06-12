import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HubWorkingTask } from 'output/entities/HubWorkingTask';
import { Repository } from 'typeorm';

@Injectable()
export class HubWorkingTaskService {
  constructor(
    @InjectRepository(HubWorkingTask)
    private readonly hubWorkingTaskRepo: Repository<HubWorkingTask>,
  ) {}

  async findAll(skip = 0, take = 50): Promise<HubWorkingTask[]> {
    return this.hubWorkingTaskRepo.find({
      skip,
      take,
      order: { id: 'DESC' },
      relations: [
        'hubListTasks',
        'hubLogs',
        'process',
        'project',
        'customer',
        'space',
        'hubWorkingTaskSubs',
      ],
    });
  }

  async findOne(id: number): Promise<HubWorkingTask | null> {
    return this.hubWorkingTaskRepo.findOne({
      where: { id },
      relations: [
        'hubListTasks',
        'hubLogs',
        'process',
        'project',
        'customer',
        'space',
        'hubWorkingTaskSubs',
      ],
    });
  }
}
