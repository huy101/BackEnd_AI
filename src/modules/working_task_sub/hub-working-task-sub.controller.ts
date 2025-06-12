import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { HubWorkingTaskSubService } from './hub-working-task-sub.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('HubWorkingTaskSub')
@Controller('hub-working-task-subs')
export class HubWorkingTaskSubController {
  constructor(private readonly taskSubService: HubWorkingTaskSubService) {}

  @Get()
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  async getAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    return this.taskSubService.findAll(Number(skip) || 0, Number(take) || 50);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskSubService.findOne(id);
  }

  @Get('/by-task/:taskId')
  async getByTaskId(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskSubService.findByTaskId(taskId);
  }
}
