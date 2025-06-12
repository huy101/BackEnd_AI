import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HubWorkingTask } from 'output/entities/HubWorkingTask';
import { HubWorkingTaskService } from './hub-working-task.service';
import { HubWorkingTaskController } from './hub-working-task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HubWorkingTask])],
  providers: [HubWorkingTaskService],
  controllers: [HubWorkingTaskController],
})
export class HubWorkingTaskModule {}
