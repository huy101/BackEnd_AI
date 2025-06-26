import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { HubProjectService } from './project.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('hub-projects')
export class HubProjectController {
  constructor(private readonly hubProjectService: HubProjectService) {}

  @Get('/list_projects')
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  getAllProjects(
    @Query('skip') skip: string = '0',
    @Query('take') take: string = '20',
  ) {
    return this.hubProjectService.getAllProjects(Number(skip), Number(take));
  }
  @Get('projects')
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'month', required: false, type: Number })
  @ApiQuery({ name: 'year', required: false, type: Number })
  @ApiQuery({ name: 'skip', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  getFilteredProjects(
    @Query('name') name?: string,
    @Query('month') month?: number,
    @Query('year') year?: number,
    @Query('skip') skip = 0,
    @Query('take') take = 20,
  ) {
    return this.hubProjectService.getAllProjectsWithFilter(
      name,
      month,
      year,
      Number(skip),
      Number(take),
    );
  }

  @Get('/:id/detail')
  getProjectDetail(@Query('id', ParseIntPipe) id: number) {
    return this.hubProjectService.getDetailById(id);
  }
  @Get(':name/overview')
  async getOverviewByName(@Query('name') name: string) {
    return this.hubProjectService.getProjectOverviewByName(name);
  }
  @Get('/projects/:id/list_tasks')
  async getTasksByProjectId(@Query('id', ParseIntPipe) id: number) {
    return this.hubProjectService.getTasksByProjectId(id);
  }
}
