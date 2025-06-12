import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HubWorkingTaskSub } from 'output/entities/HubWorkingTaskSub';
import { Repository } from 'typeorm';

@Injectable()
export class HubWorkingTaskSubService {
  constructor(
    @InjectRepository(HubWorkingTaskSub)
    private readonly taskSubRepo: Repository<HubWorkingTaskSub>,
  ) {}

  async findAll(skip = 0, take = 50): Promise<HubWorkingTaskSub[]> {
    return this.taskSubRepo.find({
      skip,
      take,
      order: { id: 'DESC' },
      relations: ['task'],
    });
  }

  async findByTaskId(taskId: number): Promise<HubWorkingTaskSub[]> {
    return this.taskSubRepo.find({
      where: { task: { id: taskId } },
      order: { order: 'ASC' },
      relations: ['task'],
    });
  }

  async findOne(id: number): Promise<HubWorkingTaskSub | null> {
    return this.taskSubRepo.findOne({
      where: { id },
      relations: ['task'],
    });
  }
}
