import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Fuse from 'fuse.js';
import { HubProject } from 'output/entities/HubProject';
import { Repository, IsNull, ILike } from 'typeorm';
@Injectable()
export class HubProjectService {
  constructor(
    @InjectRepository(HubProject)
    private readonly hubProjectRepo: Repository<HubProject>,
  ) {}

  async findAll(
    skip = 0,
    take = 50,
    projectId?: number,
  ): Promise<
    {
      id: number;
      projectName: string | null;
      deadline: Date | null;
      projectType: string | null;
      dateCreate: Date | null;
      dateSign: Date | null;
      ownerName: string | null;
      note: string | null;
      ticketSolution: string | null;
      ticketError: string | null;
      ticketPhone: string | null;
      ticketName: string | null;
      ticketEmail: string | null;
      ticketCc: string | null;
      total: number | null;
    }[]
  > {
    const whereCondition = projectId ? { id: projectId } : {};

    const projects = await this.hubProjectRepo.find({
      // select: {
      //   customer: {
      //     id: true,
      //   },
      // },
      where: whereCondition,
      skip,
      take,
      order: { id: 'DESC' },
      relations: ['customer', 'hubWorkingTasks', 'hubActivities', 'service'],
    });

    return projects.map((project) => {
      const sortedProcesses = project.hubProjectProcesses?.sort(
        (a, b) => (a.deadline?.getTime() || 0) - (b.deadline?.getTime() || 0),
      );

      const earliestDeadline =
        sortedProcesses && sortedProcesses.length > 0
          ? sortedProcesses[0].deadline
          : null;

      return {
        id: project.id,
        projectName: project.name,
        deadline: earliestDeadline,
        projectType: project.cat?.name || null,
        dateCreate: project.dateCreate,
        dateSign: project.dateSign,
        ownerName: project.customer?.name || null,
        note: project.note || null,
        ticketSolution: project.ticketSolution || null,
        ticketError: project.ticketError || null,
        ticketPhone: project.ticketPhone || null,
        ticketName: project.ticketName || null,
        ticketEmail: project.ticketEmail || null,
        ticketCc: project.ticketCc || null,
        total: project.total || null,
      };
    });
  }
  async getTasksByProjectId(projectId: number) {
    const project = await this.hubProjectRepo.findOne({
      where: { id: projectId, type: IsNull() }, // chỉ lấy dự án (not ticket)
      relations: [
        'hubWorkingTasks',
        'hubWorkingTasks.space',
        'hubWorkingTasks.process',
      ],
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${projectId} not found`);
    }

    const tasks = (project.hubWorkingTasks || []).filter(
      (task) => !task.archive,
    );

    return tasks
      .sort((a, b) => {
        const aDate = a.startDate?.getTime() || 0;
        const bDate = b.startDate?.getTime() || 0;
        return aDate - bDate;
      })
      .map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        startDate: task.startDate,
        percent: task.percent,
        assignedUser: task.assignedUser,
        spaceName: task.space?.name ?? null,
      }));
  }
  async getProjectOverviewByName(input: string) {
    const projects = await this.hubProjectRepo.find({
      relations: ['cat', 'customer', 'ownerProject'],
    });

    const normalize = (str: string): string =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    const fuse = new Fuse(projects, {
      keys: ['name'],
      threshold: 0.3,
      ignoreLocation: true,
      includeScore: true,
      useExtendedSearch: true,
      getFn: (item, path) => normalize(item.name ?? ''),
    });

    const result = fuse.search(normalize(input));

    if (result.length === 0) {
      throw new NotFoundException(
        `Project with name similar to "${input}" not found`,
      );
    }

    const project = result[0].item;

    return {
      id: project.id,
      name: project.name,
      dateCreate: project.dateCreate,
      dateSign: project.dateSign,
      categoryName: project.cat?.name ?? null,
      customerName: project.customer?.name ?? null,
      assignedUser: project.assignedUser,
      ownerProjectName: project.ownerProject?.name ?? null,
    };
  }

  async getAllProjects(
    skip = 0,
    take = 20,
  ): Promise<{ data: any[]; total: number }> {
    const [data, total] = await this.hubProjectRepo.findAndCount({
      where: {
        type: IsNull(),
      },
      skip,
      take,
      relations: ['customer', 'cat'],
      select: {
        id: true,
        name: true,
        dateCreate: true,
        assignedUser: true,
        percent: true,
        customer: {
          name: true,
        },
        cat: {
          name: true,
        },
      },
      order: {
        id: 'DESC',
      },
    });

    return { data, total };
  }

  async getAllProjectsWithFilter(
    name?: string,
    month?: number,
    year?: number,
    skip = 0,
    take = 20,
  ): Promise<{ data: any[]; total: number }> {
    const qb = this.hubProjectRepo

      .createQueryBuilder('project')
      .leftJoinAndSelect('project.customer', 'customer')
      .leftJoinAndSelect('project.cat', 'cat')
      .skip(skip)
      .take(take)
      .orderBy('project.id', 'DESC');
    qb.andWhere('project.type IS NULL');
    if (name) {
      qb.andWhere('project.name LIKE :name', { name: `%${name}%` });
    }

    if (month && year) {
      qb.andWhere(
        'MONTH(project.dateCreate) = :month AND YEAR(project.dateCreate) = :year',
        {
          month,
          year,
        },
      );
    } else if (month) {
      qb.andWhere('MONTH(project.dateCreate) = :month', { month });
    } else if (year) {
      qb.andWhere('YEAR(project.dateCreate) = :year', { year });
    }

    const [data, total] = await qb.getManyAndCount();

    const result = data.map((item) => ({
      id: item.id,
      name: item.name,
      dateCreate: item.dateCreate,
      assignedUser: item.assignedUser,
      percent: item.percent,
      customerName: item.customer?.name || null,
      categoryName: item.cat?.name || null,
    }));

    return { data: result, total };
  }

  async getDetailById(id: number) {
    const project = await this.hubProjectRepo.findOne({
      where: { id },
      relations: ['customer', 'cat', 'hubActivities', 'hubFiles', 'hubLogs'],
    });

    if (!project) return null;

    return {
      id: project.id,
      name: project.name,
      code: project.code,
      dateCreate: project.dateCreate,
      dateSign: project.dateSign,
      total: project.total,
      note: project.note,
      assignedUser: project.assignedUser,
      percent: project.percent,
      ticketEmail: project.ticketEmail,
      ticketName: project.ticketName,
      ticketProducts: project.ticketProducts,
      ticketSolution: project.ticketSolution,
      ticketPhone: project.ticketPhone,
      customer: project.customer?.name || null,
      category: project.cat?.name || null,
      activities: project.hubActivities || [],
      files: project.hubFiles || [],
      logs: project.hubLogs || [],
    };
  }
  async getDetailByIdtest(id: number) {
    const project = await this.hubProjectRepo.findOne({
      where: { id },
      relations: [
        'customer',
        'cat',
        'hubActivities',
        'hubFiles',
        'hubLogs',
        'hubWorkingTasks',
        'hubWorkingTasks.hubWorkingTaskSubs', // lấy sub-task của mỗi task
        'hubWorkingTasks.space', // lấy space chứa task
        'hubWorkingTasks.space.hubWorkingTaskColumns', // lấy các cột trong space
      ],
    });

    if (!project) return null;

    return {
      id: project.id,
      name: project.name,
      code: project.code,
      dateCreate: project.dateCreate,
      dateSign: project.dateSign,
      total: project.total,
      note: project.note,
      assignedUser: project.assignedUser,
      percent: project.percent,
      ticketEmail: project.ticketEmail,
      ticketName: project.ticketName,
      ticketProducts: project.ticketProducts,
      ticketSolution: project.ticketSolution,
      ticketPhone: project.ticketPhone,

      // Thông tin liên kết
      customer: project.customer?.name || null,
      category: project.cat?.name || null,
      activities: project.hubActivities || [],
      files: project.hubFiles || [],
      logs: project.hubLogs || [],

      // Danh sách task chi tiết
      tasks:
        project.hubWorkingTasks?.map((task) => ({
          id: task.id,
          title: task.title,
          description: task.description,
          dueDate: task.dueDate,
          startDate: task.startDate,
          percent: task.percent,
          order: task.order,
          assignedUser: task.assignedUser,
          color: task.color,
          archive: task.archive,
          type: task.type,
          followUsers: task.followUsers,
          followUserOnly: task.followUserOnly,

          space: task.space
            ? {
                id: task.space.id,
                name: task.space.name,
                columns: task.space.hubWorkingTaskColumns?.map((col) => ({
                  id: col.id,
                  name: col.name,
                  order: col.order,
                  bgColor: col.bgColor,
                  textColor: col.textColor,
                })),
              }
            : null,

          subtasks: task.hubWorkingTaskSubs?.map((sub) => ({
            id: sub.id,
            title: sub.title,
            description: sub.description,
            dueDate: sub.dueDate,
            startDate: sub.startDate,
            done: sub.done,
            status: sub.status,
            order: sub.order,
          })),
        })) || [],
    };
  }
}
