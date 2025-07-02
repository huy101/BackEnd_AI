import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { HubProjectService } from './project.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller('hub-projects')
export class HubProjectController {
  constructor(private readonly hubProjectService: HubProjectService) {}

  @Get('/list_projects')
  @ApiQuery({ name: 'skip', required: false, type: String })
  @ApiQuery({ name: 'take', required: false, type: String })
  getAllProjects(
    @Query('skip') skip: string = '0',
    @Query('take') take: string = '20',
  ) {
    return this.hubProjectService.getAllProjects(Number(skip), Number(take));
  }
  @Get('projects')
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'startMonth', required: false, type: String })
  @ApiQuery({ name: 'endMonth', required: false, type: String })
  @ApiQuery({ name: 'year', required: false, type: String })
  @ApiQuery({ name: 'assignedUserName', required: false, type: String })
  @ApiQuery({ name: 'skip', required: false, type: String })
  @ApiQuery({ name: 'take', required: false, type: String })
  getFilteredProjects(
    @Query('name') name?: string,
    @Query('startMonth') startMonth?: string,
    @Query('endMonth') endMonth?: string,
    @Query('year') year?: string,
    @Query('assignedUserName') assignedUserName?: string,
    @Query('skip') skip = '0',
    @Query('take') take = '20',
  ) {
    return this.hubProjectService.getAllProjectsWithFilter(
      name,
      startMonth ? parseInt(startMonth) : undefined,
      endMonth ? parseInt(endMonth) : undefined,
      year ? parseInt(year) : undefined,
      assignedUserName,
      skip ? parseInt(skip) : undefined,
      take ? parseInt(take) : undefined,
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
