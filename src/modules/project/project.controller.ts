import { Controller, Get, Param, Query } from '@nestjs/common';
import { HubProjectService } from './project.service';

@Controller('hub-projects')
export class HubProjectController {
  constructor(private readonly hubProjectService: HubProjectService) {}

  @Get()
  async findAll(@Query('skip') skip = 0, @Query('take') take = 50) {
    return this.hubProjectService.findAll(+skip, +take);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.hubProjectService.findOne(+id);
  }
}
