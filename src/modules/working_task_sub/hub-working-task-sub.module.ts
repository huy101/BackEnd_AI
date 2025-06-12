import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HubWorkingTaskSub } from 'output/entities/HubWorkingTaskSub';
import { HubWorkingTaskSubService } from './hub-working-task-sub.service';
import { HubWorkingTaskSubController } from './hub-working-task-sub.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HubWorkingTaskSub])],
  providers: [HubWorkingTaskSubService],
  controllers: [HubWorkingTaskSubController],
})
export class HubWorkingTaskSubModule {}
