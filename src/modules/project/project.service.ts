import { removeNullFieldsDeep } from 'src/utils/removeNullFields';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Fuse from 'fuse.js';
import { HubProject } from 'output/entities/HubProject';
import { Repository, IsNull } from 'typeorm';
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
    const projects = await this.hubProjectRepo.find({
      where: { id: projectId },
      relations: [
        'hubWorkingTasks',
        'hubWorkingTasks.hubWorkingTaskSubs',
        'hubWorkingTasks.space',
        'hubWorkingTasks.space.hubWorkingTaskColumns',
      ],
    });

    const tasks = projects[0]?.hubWorkingTasks || [];

    const allUserIds = [
      ...new Set(
        tasks
          .flatMap((task) =>
            task.assignedUser
              ? task.assignedUser.split(',').map((id) => id.trim())
              : [],
          )
          .filter(Boolean),
      ),
    ];

    let userMap = new Map<string, string>();
    if (allUserIds.length > 0) {
      const users = await this.hubProjectRepo
        .createQueryBuilder()
        .select(['u.Id AS id', 'u.Name AS name'])
        .from('AspNetUsers', 'u')
        .where('u.Id IN (:...ids)', { ids: allUserIds })
        .getRawMany<{ id: string; name: string }>();

      userMap = new Map(users.map((u) => [u.id, u.name]));
    }

    const result = tasks.map((task) => {
      const assignedUserNames = task.assignedUser
        ? task.assignedUser
            .split(',')
            .map((id) => userMap.get(id.trim()))
            .filter(Boolean)
        : [];

      return {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        startDate: task.startDate,
        percent: task.percent,
        assignedUserNames,
        order: task.order,
        color: task.color,
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
        subs: task.hubWorkingTaskSubs?.map((sub) => ({
          id: sub.id,
          title: sub.title,
          done: sub.done,
          dueDate: sub.dueDate,
          order: sub.order,
        })),
      };
    });

    return removeNullFieldsDeep(result);
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
      getFn: (item) => normalize(item.name ?? ''),
    });

    const result = fuse.search(normalize(input));
    if (result.length === 0) {
      throw new NotFoundException(
        `Project with name similar to "${input}" not found`,
      );
    }

    const project = result[0].item;

    const userIds = project.assignedUser
      ? project.assignedUser.split(',').map((id) => id.trim())
      : [];

    let userMap = new Map<string, string>();
    if (userIds.length > 0) {
      const users = await this.hubProjectRepo
        .createQueryBuilder()
        .select(['u.Id AS id', 'u.Name AS name'])
        .from('AspNetUsers', 'u')
        .where('u.Id IN (:...ids)', { ids: userIds })
        .getRawMany<{ id: string; name: string }>();

      userMap = new Map(users.map((u) => [u.id, u.name]));
    }

    const data = {
      id: project.id,
      name: project.name,
      dateCreate: project.dateCreate,
      dateSign: project.dateSign,
      categoryName: project.cat?.name ?? null,
      customerName: project.customer?.name ?? null,
      assignedUserNames: userIds.map((id) => userMap.get(id) ?? id),
      ownerProjectName: project.ownerProject?.name ?? null,
    };

    return {
      data: removeNullFieldsDeep([data])[0],
    };
  }

  async getAllProjectsWithFilter(
    name?: string,
    startMonth?: number,
    endMonth?: number,
    year?: number,
    assignedUserName?: string,
    skip = 0,
    take = 20,
  ): Promise<{ data: any[]; total: number }> {
    console.log(startMonth, endMonth, year, skip, take);
    const qb = this.hubProjectRepo
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.customer', 'customer')
      .leftJoinAndSelect('project.cat', 'cat')
      .where('project.type IS NULL')
      .orderBy('project.id', 'DESC')
      .skip(skip)
      .take(take);

    if (name) {
      qb.andWhere('project.name LIKE :name', { name: `%${name}%` });
    }

    if (startMonth && year) {
      const sm = Number(startMonth);
      const em = endMonth ? Number(endMonth) : sm;

      const startDate = new Date(year, sm - 1, 1);
      const endDate = new Date(year, em, 0, 23, 59, 59, 999); // Cuối ngày cuối tháng

      qb.andWhere('project.dateCreate BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      });
    } else if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
      qb.andWhere('project.dateCreate BETWEEN :start AND :end', {
        start: startDate,
        end: endDate,
      });
    }
    const [data, total] = await qb.getManyAndCount();

    // 👉 Gom tất cả userIds từ các project
    const userIds = [
      ...new Set(
        data
          .flatMap((proj) =>
            proj.assignedUser
              ? proj.assignedUser.split(',').map((id) => id.trim())
              : [],
          )
          .filter(Boolean),
      ),
    ];

    let userMap = new Map<string, string>();
    if (userIds.length > 0) {
      const users = await this.hubProjectRepo
        .createQueryBuilder()
        .select(['u.Id AS id', 'u.Name AS name'])
        .from('AspNetUsers', 'u')
        .where('u.Id IN (:...ids)', { ids: userIds })
        .getRawMany<{ id: string; name: string }>();

      userMap = new Map(users.map((u) => [u.id, u.name]));
    }

    // 👉 Map lại từng project với assignedUserNames
    const result = data.map((item) => {
      const assignedUserIds = item.assignedUser
        ? item.assignedUser.split(',').map((id) => id.trim())
        : [];

      return {
        id: item.id,
        name: item.name,
        dateCreate: item.dateCreate,
        assignedUserNames: assignedUserIds.map((id) => userMap.get(id) ?? id),
        percent: item.percent,
        customerName: item.customer?.name || null,
        categoryName: item.cat?.name || null,
      };
    });
    if (assignedUserName?.trim()) {
      const filteredResult = result.filter((r) =>
        r.assignedUserNames.some((name) =>
          name.toLowerCase().includes(assignedUserName.toLowerCase()),
        ),
      );
      return { data: filteredResult, total: filteredResult.length };
    }
    return { data: removeNullFieldsDeep(result), total };
  }

  async getDetailById(id: number) {
    const project = await this.hubProjectRepo.findOne({
      where: { id },
      relations: ['customer', 'cat', 'hubActivities', 'hubFiles', 'hubLogs'],
    });

    if (!project) return null;

    const userIds = project.assignedUser
      ? project.assignedUser.split(',').map((id) => id.trim())
      : [];
    console.log('userIds', userIds);
    let userMap = new Map<string, string>();
    if (userIds.length > 0) {
      const users = await this.hubProjectRepo
        .createQueryBuilder()
        .select(['u.Id AS id', 'u.Name AS name'])
        .from('AspNetUsers', 'u')
        .where('u.Id IN (:...ids)', { ids: userIds })
        .getRawMany<{ id: string; name: string }>();

      userMap = new Map(users.map((u) => [u.id, u.name]));
      console.log('userMap', userMap);
    }
    const data = {
      id: project.id,
      name: project.name,
      code: project.code,
      dateCreate: project.dateCreate,
      dateSign: project.dateSign,
      total: project.total,
      note: project.note,
      assignedUserNames: userIds.map((id) => userMap.get(id) ?? id),

      percent: project.percent,
      ticketEmail: project.ticketEmail,
      ticketName: project.ticketName,
      ticketProducts: project.ticketProducts,
      ticketSolution: project.ticketSolution,
      ticketPhone: project.ticketPhone,
      customer: project.customer?.name || null,
      category: project.cat?.name || null,
    };
    return { data: removeNullFieldsDeep([data])[0] };
  }
}
