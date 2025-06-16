import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { HubWorkingTaskService } from './hub-working-task.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('working_task')
@Controller('working-tasks')
export class HubWorkingTaskController {
  constructor(private readonly hubWorkingTaskService: HubWorkingTaskService) {}

  @Get()
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Số bản ghi bỏ qua',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    type: Number,
    description: 'Số bản ghi lấy ra',
  })
  async getAll(@Query('skip') skip?: number, @Query('take') take?: number) {
    return this.hubWorkingTaskService.findAll(
      Number(skip) || 0,
      Number(take) || 50,
    );
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.hubWorkingTaskService.findOne(id);
  }
}
