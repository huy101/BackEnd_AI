import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HubProject } from 'output/entities/HubProject';
import { Repository } from 'typeorm';

@Injectable()
export class HubProjectService {
  constructor(
    @InjectRepository(HubProject)
    private readonly hubProjectRepo: Repository<HubProject>,
  ) {}

  async findAll(skip = 0, take = 50): Promise<HubProject[]> {
    return this.hubProjectRepo.find({
      skip,
      take,
      order: { id: 'DESC' },
      relations: [
        'customer',
        'hubTasks',
        'hubProjectUsers',
        'hubProjectTags',
        // thêm các bảng liên quan khác nếu cần
      ],
    });
  }

  async findOne(id: number): Promise<HubProject | null> {
    return this.hubProjectRepo.findOne({
      where: { id },
      relations: ['customer', 'hubTasks', 'hubProjectUsers', 'hubProjectTags'],
    });
  }
}
