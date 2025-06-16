import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HubProject } from 'output/entities/HubProject';
import { HubProjectController } from './project.controller';
import { HubProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([HubProject])],
  providers: [HubProjectService],
  controllers: [HubProjectController],
})
export class HubProjectModule {}
