import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PtCustomer } from 'output/entities/PtCustomer';
import { IsNull, Like, Repository } from 'typeorm';

@Injectable()
export class PtCustomerService {
  constructor(
    @InjectRepository(PtCustomer)
    private readonly ptCustomerRepo: Repository<PtCustomer>,
  ) {}

  async findDetailById(id: number) {
    const customer = await this.ptCustomerRepo.findOne({
      where: { id },
      relations: [
        'cat',
        'ptProducts',
        'hubCustomerRes',
        'hubProjects',
        'hubCustomerRes.idCustomer_3',
      ],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    // Danh sách sản phẩm
    const products = (customer.ptProducts || []).map((product) => ({
      id: product.id,
      name: product.name,
      dateActive: product.dateActive,
      dateRenew: product.dateRenew,
      seats: product.seats ?? null,
    }));
    const projects = (customer?.hubProjects || [])
      .filter((project) => project.type === null) // chỉ lấy project chính
      .map((project) => ({
        name: project.name,
        id: project.id,
        dateCreate: project.dateCreate,
        dateSign: project.dateSign,
      }));

    const tickets = (customer?.hubProjects || [])
      .filter((ticket) => ticket.type === 10) // chỉ lấy ticket hỗ trợ
      .map((ticket) => ({
        name: ticket.name,
        id: ticket.id,
        dateCreate: ticket.dateCreate,
        dateSign: ticket.dateSign,
      }));

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    // Danh sách khách hàng hợp tác (từ hubCustomerRe -> idCustomer_3)
    const partners = (customer.hubCustomerRes || []).map((rel) => ({
      id: rel.idCustomer_3?.id ?? null,
      name: rel.idCustomer_3?.name ?? null,
    }));

    return {
      id: customer.id,
      name: customer.name,
      fullName: customer.fullName,
      email: customer.email,
      phone: customer.phone,
      categoryName: customer.cat?.name ?? null,
      assignedUser: customer.assignedUser,
      ticketDefaultCc: customer.ticketDefaultCc,
      ticketDefaultBcc: customer.ticketDefaultBcc,
      insightData: customer.insightData,
      insightLastUpdate: customer.insightLastUpdate,
      website: customer.website,
      products,
      projects,
      partners,
      tickets,
    };
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
    key?: string,
  ): Promise<{ data: PtCustomer[]; total: number }> {
    const whereCondition = key ? { name: Like(`%${key}%`) } : {};

    const [data, total] = await this.ptCustomerRepo.findAndCount({
      where: whereCondition,
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

    return { data, total };
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

    return { data, total };
  }

  async getOverviewByName(name: string) {
    // Bước 1: Tìm customer.id theo tên (có thể LIKE hoặc =)
    const customerIdResult = await this.ptCustomerRepo.findOne({
      where: { name: Like(`%${name}%`) },
      select: ['id'],
      order: { id: 'DESC' }, // hoặc 'ASC' nếu muốn bản ghi đầu tiên theo thứ tự
    });

    if (!customerIdResult) {
      throw new NotFoundException(`Customer with name ${name} not found`);
    }

    const customerId = customerIdResult.id;

    // Bước 2: Join status & cat để lấy thông tin chi tiết
    const customer = await this.ptCustomerRepo
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.status', 'status')
      .leftJoinAndSelect('customer.cat', 'cat')
      .leftJoinAndSelect('customer.ptProducts', 'ptProducts')
      .leftJoinAndSelect('customer.hubProjects', 'hubProjects')
      .where('customer.id = :customerId', { customerId })
      .andWhere('hubProjects.type IS NULL')
      .getOne();
    const products = (customer?.ptProducts || []).map((product) => ({
      id: product.id,
      name: product.name,
      dateActive: product.dateActive,
      dateRenew: product.dateRenew,
    }));
    const firstProject = (customer?.hubProjects || [])[0] ?? null;
    const project = firstProject
      ? {
          id: firstProject.id,
          name: firstProject.name,
          dateCreate: firstProject.dateCreate,
          dateSign: firstProject.dateSign,
        }
      : null;
    // const projects = (customer?.hubProjects || []).map((project) => ({
    //   name: project.name,
    //   id: project.id,
    //   dateCreate: project.dateCreate,
    //   dateSign: project.dateSign,
    // }));
    if (!customer) {
      throw new NotFoundException(`Customer with id ${customerId} not found`);
    }

    return {
      id: customerId,

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
      project,
    };
  }

  async findProjectsByCustomerId(customerId: number) {
    return this.ptCustomerRepo
      .createQueryBuilder('customer')
      .leftJoin('customer.hubProjects', 'project') // ← join từ customer sang project
      .select([
        'project.id AS id',
        'project.name AS name',
        'project.code AS code',
        'project.dateCreate AS dateCreate',
        'project.dateSign AS dateSign',
      ])
      .where('customer.id = :customerId', { customerId })
      .andWhere('project.type IS NULL')
      .getRawMany();
  }
  async findContactsByCustomerId(customerId: number) {
    return this.ptCustomerRepo
      .createQueryBuilder('customer')
      .leftJoin('customer.hubContacts', 'contacts')
      .select([
        'contacts.name AS Name',
        'contacts.phone AS Phone',
        'contacts.email AS Email',
        'contacts.email2 AS Email2',
        'contacts.followUsers AS FollowUsers',
      ])
      .where('customer.id = :customerId', { customerId })
      .getRawMany();
  }
  async findProductsByCustomerId(customerId: number) {
    return this.ptCustomerRepo
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
  }
  async getActivitiesByCustomer(customerId: number) {
    const customer = await this.ptCustomerRepo.findOne({
      where: { id: customerId },
      relations: ['hubActivities', 'hubProjects'],
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

    const mostActiveUser = Object.entries(userCount).reduce(
      (a, [userId, u]) => (u.count > a.count ? { userId, ...u } : a),
      { userId: '', name: '', count: 0 },
    );

    const recentActivities = activities.slice(0, 10).map((act) => ({
      id: act.id,
      title: act.title,
      dateCreate: act.dateCreate,
      userId: act.userId,
      userName: act.userId ?? 'Unknown User',
      type: typeMap[act.type ?? 0] || 'Other',
      project: act.project
        ? {
            id: act.project.id,
            name: act.project.name,
          }
        : null,
    }));

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

    // Chỉ lấy các trường liên quan đến ticket
    const tickets = ticketProjects.map((project) => ({
      id: project.id,
      customerName: customer.name,
      name: project.name,
      ticketName: project.ticketName,
      ticketEmail: project.ticketEmail,
      ticketEmailDate: project.ticketEmailDate,
      ticketProducts: project.ticketProducts,
      ticketPhone: project.ticketPhone,
      ticketError: project.ticketError,
      ticketSolution: project.ticketSolution,
    }));

    return tickets.sort((a, b) => {
      const dateA = a.ticketEmailDate
        ? new Date(a.ticketEmailDate).getTime()
        : 0;
      const dateB = b.ticketEmailDate
        ? new Date(b.ticketEmailDate).getTime()
        : 0;
      return dateB - dateA; // sort DESC by date
    });
  }
}
