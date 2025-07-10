import { Counter } from './../../../output/entities/Counter';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stat } from 'fs';
import { PtCustomer } from 'output/entities/PtCustomer';
import { normalize } from 'path';

import {
  removeNullFieldsDeep,
  removeNullFromObject,
} from 'src/utils/removeNullFields';
import { Brackets, Like, Repository } from 'typeorm';

@Injectable()
export class PtCustomerService {
  constructor(
    @InjectRepository(PtCustomer)
    private readonly ptCustomerRepo: Repository<PtCustomer>,
  ) {}

  async findDetailById(id: number): Promise<any> {
    const customer = await this.ptCustomerRepo
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.cat', 'cat')
      .leftJoinAndSelect('customer.ptProducts', 'ptProducts')
      .leftJoinAndSelect(
        'customer.hubProjects',
        'hubProjects',
        'hubProjects.type IS NULL OR hubProjects.type = 10',
      )
      .leftJoinAndSelect('customer.hubCustomerRes', 'res')
      .leftJoinAndSelect('res.idCustomer_3', 'partner')
      .select([
        'customer.id',
        'customer.name',
        'customer.fullName',
        'customer.email',
        'customer.phone',
        'customer.assignedUser',
        'customer.website',
        'cat.name',
        'ptProducts.id',
        'ptProducts.name',
        'ptProducts.dateActive',
        'ptProducts.dateRenew',
        'ptProducts.seats',
        'hubProjects.id',
        'hubProjects.name',
        'hubProjects.type',
        'hubProjects.dateCreate',
        'hubProjects.dateSign',
        'res.idCustomer_1',
        'res.idCustomer_2',

        'partner.id',
        'partner.name',
      ])
      .where('customer.id = :id', { id })
      .getOne();

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    const userIds = Array.isArray(customer.assignedUser)
      ? customer.assignedUser
      : typeof customer.assignedUser === 'string'
        ? customer.assignedUser.split(',').map((s) => s.trim())
        : [];

    let userMap = new Map<string, string>();
    if (userIds.length > 0) {
      const users = await this.ptCustomerRepo
        .createQueryBuilder()
        .select(['u.Id AS id', 'u.Name AS name'])
        .from('AspNetUsers', 'u')
        .where('u.Id IN (:...ids)', { ids: userIds })
        .getRawMany<{ id: string; name: string }>();

      userMap = new Map(users.map((u) => [u.id, u.name]));
    }
    const products = (customer.ptProducts || []).map((product) => ({
      id: product.id,
      name: product.name,
      dateActive: product.dateActive,
      dateRenew: product.dateRenew,
      seats: product.seats ?? null,
      renew: product.dateRenew !== null && product.dateRenew !== undefined,
    }));
    const totalHasRenewDate = products.filter(
      (p) => p.dateRenew !== null && p.dateRenew !== undefined,
    ).length;

    const projects = (customer?.hubProjects || [])
      .filter((project) => project.type === null)
      .map((project) => ({
        name: project.name,
        id: project.id,
        dateCreate: project.dateCreate,
        dateSign: project.dateSign,
      }));

    const tickets = (customer?.hubProjects || [])
      .filter((ticket) => ticket.type === 10)
      .map((ticket) => ({
        name: ticket.name,
        id: ticket.id,
        dateCreate: ticket.dateCreate,
        dateSign: ticket.dateSign,
      }));

    const partners = (customer.hubCustomerRes || []).map((rel) => ({
      id: rel.idCustomer_3?.id ?? null,
      name: rel.idCustomer_3?.name ?? null,
    }));

    const data = {
      id: customer.id,
      name: customer.name,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      categoryName: customer.cat?.name ?? null,
      assignedUser: customer.assignedUser,
      assignedUserName: userMap.get(customer.assignedUser ?? '') || null,

      website: customer.website,
      totalRenewDate: totalHasRenewDate,
      products,
      projects,
      partners,
      tickets,
    };
    return removeNullFromObject(data);
  }
  async findById(id: number): Promise<PtCustomer | null> {
    return this.ptCustomerRepo.findOne({
      where: { id },
      relations: ['cat'],
      select: {
        id: true,
        name: true,
        fullName: true,
        email: true,
        phone: true,
        cat: {
          name: true,
        },
      },
    });
  }
  async findListByName(
    skip = 0,
    take = 20,
    key: string = '',
    assignedUserName: string = '',
    cityName: string = '',
    fields: string = '',
    statusName: string = '',
    lastUpdate: Date | string = '',
  ): Promise<{ data: any[]; total: number }> {
    const query = this.ptCustomerRepo
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.cat', 'cat')
      .leftJoinAndSelect('customer.city', 'city') // join để lọc theo city name
      .leftJoinAndSelect('customer.status', 'status')
      .where('1=1');

    // Lọc theo tên hoặc fullName
    if (key) {
      const normalized = normalize(key);
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('LOWER(customer.name) LIKE :key', {
            key: `%${normalized}%`,
          });
          qb.orWhere('LOWER(customer.fullName) LIKE :key', {
            key: `%${normalized}%`,
          });
        }),
      );
    }

    // Lọc theo assignedUserName (Tên user trong AspNetUsers)
    if (assignedUserName) {
      const matchedUsers = await this.ptCustomerRepo
        .createQueryBuilder()
        .select(['u.Id AS id'])
        .from('AspNetUsers', 'u')
        .where('u.Name LIKE :name', { name: `%${assignedUserName}%` })
        .getRawMany<{ id: string }>();

      const matchedUserIds = matchedUsers.map((u) => u.id);

      if (matchedUserIds.length > 0) {
        const conditions = matchedUserIds.map(
          (id) => `CHARINDEX('${id}', customer.assignedUser) > 0`,
        );
        query.andWhere(`(${conditions.join(' OR ')})`);
      } else {
        return { data: [], total: 0 };
      }
    }
    if (cityName) {
      const normalized = normalize(cityName);
      query.andWhere('LOWER(city.name) LIKE :city', {
        city: `%${normalized}%`,
      });
    }
    // 🔍 Lọc theo fields (chuỗi)
    if (fields) {
      const normalized = normalize(fields);
      query.andWhere('LOWER(customer.fields) LIKE :fields', {
        fields: `%${normalized}%`,
      });
    }

    // 🔍 Lọc theo status.name
    if (statusName) {
      const normalized = normalize(statusName);
      query.andWhere('LOWER(status.name) LIKE :status', {
        status: `%${normalized}%`,
      });
    }
    if (lastUpdate) {
      const parsedDate = new Date(lastUpdate);
      if (!isNaN(parsedDate.getTime())) {
        query.andWhere('CAST(customer.lastUpdate AS DATETIME) = :lastUpdate', {
          lastUpdate: parsedDate.toISOString(),
        });
      }
    }
    const [customers, total] = await query
      .select([
        'customer.id',
        'customer.name',
        'customer.fullName',
        'customer.email',
        'customer.phone',
        'customer.assignedUser',
        'customer.fields',
        'customer.lastUpdate',
        'city.name',
        'status.name',
        'cat.name',
      ])
      .skip(skip)
      .take(take)
      .orderBy('customer.id', 'DESC')
      .getManyAndCount();
    query.getCount();
    // Lấy userIds từ assignedUser (nhiều id ngăn cách bằng dấu phẩy)
    const userIds = Array.from(
      new Set(
        customers
          .flatMap((cus) =>
            cus.assignedUser
              ? cus.assignedUser.split(',').map((id) => id.trim())
              : [],
          )
          .filter(Boolean),
      ),
    );

    const userMap = new Map<string, string>();
    if (userIds.length > 0) {
      const chunkSize = 500;
      for (let i = 0; i < userIds.length; i += chunkSize) {
        const chunk = userIds.slice(i, i + chunkSize);
        const users = await this.ptCustomerRepo
          .createQueryBuilder()
          .select(['u.Id AS id', 'u.Name AS name'])
          .from('AspNetUsers', 'u')
          .where('u.Id IN (:...ids)', { ids: chunk })
          .getRawMany<{ id: string; name: string }>();

        users.forEach((u) => userMap.set(u.id, u.name));
      }
    }

    const enrichedData = customers.map((cus) => {
      const ids = cus.assignedUser?.split(',').map((id) => id.trim()) || [];
      const assignedUserNames = ids
        .map((id) => userMap.get(id))
        .filter(Boolean);

      const { assignedUser, ...rest } = cus;
      return {
        ...rest,
        assignedUserNames,
      };
    });

    return { data: removeNullFieldsDeep(enrichedData), total };
  }

  async findListByNameNoQuery(
    skip = 0,
    take = 20,
  ): Promise<{ data: PtCustomer[]; total: number }> {
    const [data, total] = await this.ptCustomerRepo.findAndCount({
      skip,
      take,
      relations: ['cat'],
      select: {
        id: true,
        name: true,
        fullName: true,
        email: true,
        phone: true,
        cat: {
          name: true,
        },
      },
      order: {
        id: 'DESC',
      },
    });

    const cleanedResult = removeNullFieldsDeep(data);
    return { data: cleanedResult, total };
  }

  async getOverviewByName(name: string) {
    // Tìm ID theo tên gần đúng
    const customerIdResult = await this.ptCustomerRepo.findOne({
      where: { name: Like(`%${name}%`) },
      select: ['id'],
    });

    if (!customerIdResult?.id) {
      throw new NotFoundException(`Customer with name '${name}' not found`);
    }

    // Lấy đầy đủ thông tin customer (không lọc hubProjects ở đây)
    const customer = await this.ptCustomerRepo
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.status', 'status')
      .leftJoinAndSelect('customer.cat', 'cat')
      .leftJoinAndSelect('customer.ptProducts', 'ptProducts')
      .leftJoinAndSelect('customer.hubProjects', 'hubProjects')
      .where('customer.id = :customerId', { customerId: customerIdResult.id })
      .getOne();

    if (!customer) {
      throw new NotFoundException(
        `Customer with id ${customerIdResult.id} not found`,
      );
    }

    // Lọc các project có type IS NULL
    const filteredProjects = (customer.hubProjects || []).filter(
      (p) => p.type === null,
    );

    // Chọn 1 project đầu tiên nếu có
    const firstProject = filteredProjects[0] ?? null;
    const project = firstProject
      ? {
          id: firstProject.id,
          name: firstProject.name,
          dateCreate: firstProject.dateCreate,
          dateSign: firstProject.dateSign,
        }
      : null;

    const products = (customer.ptProducts || []).map((product) => ({
      id: product.id,
      name: product.name,
      dateActive: product.dateActive,
      dateRenew: product.dateRenew,
    }));

    return removeNullFromObject({
      id: customer.id,
      name: customer.name,
      fullname: customer.fullName,
      description: customer.description,
      phone: customer.phone,
      email: customer.email,
      website: customer.website,
      address: customer.address,
      statusName: customer.status?.name || null,
      categoryName: customer.cat?.name || null,
      products,
      project, // một dự án đầu tiên nếu có
      allProjects: filteredProjects, // ← thêm nếu bạn muốn trả về toàn bộ danh sách project type null
    });
  }

  async findProjectsByCustomerId(customerId: number) {
    type ProjectRaw = {
      project_id: number;
      project_name: string;
      project_code: string;
      project_dateCreate: Date;
      project_dateSign: Date;
    };

    const projects: ProjectRaw[] = await this.ptCustomerRepo
      .createQueryBuilder('customer')
      .leftJoin('customer.hubProjects', 'project')
      .select([
        'project.id AS project_id',
        'project.name AS project_name',
        'project.code AS project_code',
        'project.dateCreate AS project_dateCreate',
        'project.dateSign AS project_dateSign',
      ])
      .where('customer.id = :customerId', { customerId })
      .andWhere('project.type IS NULL')
      .getRawMany();

    return projects.map((p) =>
      removeNullFromObject({
        id: p.project_id,
        name: p.project_name,
        code: p.project_code,
        dateCreate: p.project_dateCreate,
        dateSign: p.project_dateSign,
      }),
    );
  }

  async findContactsByCustomerId(customerId: number) {
    type ContactRaw = {
      contact_name: string;
      contact_phone: string;
      contact_email: string;
      contact_email2: string;
      contact_followUsers: string;
    };

    const contacts: ContactRaw[] = await this.ptCustomerRepo
      .createQueryBuilder('customer')
      .leftJoin('customer.hubContacts', 'contact')
      .select([
        'contact.name AS contact_name',
        'contact.phone AS contact_phone',
        'contact.email AS contact_email',
        'contact.email2 AS contact_email2',
        'contact.followUsers AS contact_followUsers',
      ])
      .where('customer.id = :customerId', { customerId })
      .getRawMany();

    return contacts.map((c) =>
      removeNullFromObject({
        name: c.contact_name,
        phone: c.contact_phone,
        email: c.contact_email,
        email2: c.contact_email2,
        followUsers: c.contact_followUsers,
      }),
    );
  }

  async findProductsByCustomerId(customerId: number) {
    const products = await this.ptCustomerRepo
      .createQueryBuilder('customer')
      .leftJoin('customer.ptProducts', 'product')
      .select([
        'product.id AS id',
        'product.name AS name',
        'product.dateActive AS dateActive',
        'product.dateRenew AS dateRenew',
        'product.seats AS seats',
      ])
      .where('customer.id = :customerId', { customerId })
      .getRawMany();

    return products.map((p) => removeNullFromObject(p));
  }

  async getActivitiesByCustomer(customerId: number) {
    const customer = await this.ptCustomerRepo.findOne({
      where: { id: customerId },
      relations: ['hubActivities', 'hubActivities.project', 'hubProjects'],
    });

    if (!customer || !customer.hubActivities) {
      return {
        totalActivities: 0,
        weeksActive: 0,
        averagePerWeek: 0,
        mostActiveUser: null,
        mostFrequentType: null,
        byWeek: [],
        byType: [],
        recentActivities: [],
      };
    }

    const activities = customer.hubActivities;

    const totalActivities = activities.length;
    const typeMap: Record<number, string> = {
      1: 'Email',
      2: 'Call',
      3: 'Meeting',
      4: 'Research',
      5: 'Message',
      6: 'Online Meeting',
    };

    const validActivities = activities.filter((act) => act.dateCreate);

    const weeksMap: Record<string, number> = {};
    for (const act of validActivities) {
      const date = new Date(act.dateCreate!);
      const oneJan = new Date(date.getFullYear(), 0, 1);
      const week = Math.ceil(
        ((date.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) /
          7,
      );
      const weekStr = `${date.getFullYear()}-W${week}`;
      weeksMap[weekStr] = (weeksMap[weekStr] || 0) + 1;
    }

    const byWeek = Object.entries(weeksMap).map(([week, count]) => ({
      week,
      count,
    }));

    const byTypeMap: Record<string, number> = {};
    const userCount: Record<string, { name: string; count: number }> = {};

    for (const act of activities) {
      const type = typeMap[act.type ?? 0] || 'Other';
      byTypeMap[type] = (byTypeMap[type] || 0) + 1;

      const userId = act.userId ?? 'unknown';
      const userName = userId;
      if (!userCount[userId]) {
        userCount[userId] = { name: userName, count: 0 };
      }
      userCount[userId].count++;
    }

    const byType = Object.entries(byTypeMap).map(([type, count]) => ({
      type,
      count,
    }));
    const mostFrequentType = byType.reduce(
      (a, b) => (a.count > b.count ? a : b),
      {
        type: '',
        count: 0,
      },
    );
    const userIds = [
      ...new Set(activities.map((act) => act.userId).filter(Boolean)),
    ];

    let userMap = new Map<string, string>();
    if (userIds.length > 0) {
      const users = await this.ptCustomerRepo
        .createQueryBuilder()
        .select(['u.Id AS id', 'u.Name AS name'])
        .from('AspNetUsers', 'u')
        .where('u.Id IN (:...ids)', { ids: userIds })
        .getRawMany<{ id: string; name: string }>();

      userMap = new Map(users.map((u) => [u.id, u.name]));
    }

    const mostActiveUser = Object.entries(userCount).reduce(
      (a, [userId, u]) =>
        u.count > a.count
          ? { name: userMap.get(userId) ?? userId, count: u.count }
          : a,
      { userId: '', name: '', count: 0 },
    );

    const recentActivities = removeNullFieldsDeep(
      activities.slice(0, 10).map((act) => ({
        id: act.id,
        title: act.title,
        dateCreate: act.dateCreate,
        userId: act.userId,
        userName: userMap.get(act.userId ?? '') || 'Unknown User',
        type: typeMap[act.type ?? 0] || 'Other',

        project: act.project
          ? {
              id: act.project.id,
              name: act.project.name,
            }
          : null,
      })),
    );

    const weeksCount = Object.keys(weeksMap).length;

    return {
      totalActivities,
      weeksActive: weeksCount,
      averagePerWeek: weeksCount ? Math.round(totalActivities / weeksCount) : 0,
      mostActiveUser,
      mostFrequentType,
      byWeek,
      byType,
      recentActivities,
    };
  }
  async getCustomerTickets(customerId: number) {
    const customer = await this.ptCustomerRepo.findOne({
      where: { id: customerId },
      relations: ['hubProjects'],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with id ${customerId} not found`);
    }

    // Lọc các project có ticket
    const ticketProjects = (customer.hubProjects || []).filter(
      (project) =>
        project.type === 10 &&
        (project.ticketEmail || project.ticketName || project.ticketSolution),
    );
    const userIds = [
      ...new Set(ticketProjects.map((p) => p.assignedUser).filter(Boolean)),
    ];
    let userMap = new Map<string, string>();
    if (userIds.length > 0) {
      const users = await this.ptCustomerRepo
        .createQueryBuilder()
        .select(['u.Id AS id', 'u.Name AS name'])
        .from('AspNetUsers', 'u')
        .where('u.Id IN (:...ids)', { ids: userIds })
        .getRawMany<{ id: string; name: string }>();

      userMap = new Map(users.map((u) => [u.id, u.name]));
    }
    // Chỉ lấy các trường liên quan đến ticket
    const tickets = ticketProjects.map((project) => ({
      id: project.id,
      customerName: customer.name,
      name: project.name,
      ticketName: project.ticketName,
      ticketEmail: project.ticketEmail,
      ticketProducts: project.ticketProducts,
      ticketPhone: project.ticketPhone,
      ticketError: project.ticketError,
      ticketSolution: project.ticketSolution,
      ticketAssignedUser: project.assignedUser,
      assignedUserName: userMap.get(project.assignedUser ?? '') || null,
    }));

    return removeNullFieldsDeep(tickets);
  }
}
