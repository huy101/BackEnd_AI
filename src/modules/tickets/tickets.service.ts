import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HubProject } from 'output/entities/HubProject';
import { Repository } from 'typeorm';
import { findStatusIdByFuzzyText, statusMap } from '../../utils/normalize';

@Injectable()
export class ticketsService {
  constructor(
    @InjectRepository(HubProject)
    private readonly ticketsRepo: Repository<HubProject>,
  ) {}

  async findAll(skip = 0, take = 50): Promise<HubProject[]> {
    return this.ticketsRepo.find({
      skip,
      take,
      order: { id: 'DESC' },

      relations: ['brand'],
    });
  }
  async getTicketsByStatus(
    input?: string | number,
    skip = 0,
    take = 20,
    assignedUserName?: string,
  ) {
    let statusId: number | undefined = undefined;

    if (typeof input === 'string') {
      statusId = findStatusIdByFuzzyText(input);
    } else if (typeof input === 'number') {
      statusId = input;
    }

    const query = this.ticketsRepo
      .createQueryBuilder('project')
      .leftJoin('AspNetUsers', 'user', 'user.Id = project.assignedUser')

      .where('project.type = :type', { type: 10 });
    if (statusId !== undefined) {
      query.andWhere('project.statusId = :status', { status: statusId });
    }

    if (assignedUserName) {
      query.andWhere('user.Name LIKE :assignedUserName', {
        assignedUserName: `%${assignedUserName}%`,
      });
    }
    if (statusId !== undefined) {
      query.andWhere('project.statusId = :status', { status: statusId });
    }

    const [tickets, total] = await query
      .skip(skip)
      .take(take)
      .select([
        'project.id',
        'project.name',
        'project.ticketName',
        'project.ticketPhone',
        'project.ticketEmail',
        'project.ticketCc',
        'project.ticketProducts',
        'project.ticketSolution',
        'project.ticketError',
        'project.dateCreate',
        'project.dateSign',
        'project.statusId',
        'project.assignedUser',
      ])
      .orderBy('project.dateCreate', 'DESC')

      .getManyAndCount();
    const productIds = [
      ...new Set(
        tickets
          .map((t) => t.ticketProducts)
          .filter(Boolean)
          .flatMap((val) =>
            typeof val === 'string'
              ? val
                  .split(',')
                  .map((v) => Number(v.trim()))
                  .filter(Boolean)
              : [val],
          ),
      ),
    ];

    console.log('productIds', productIds);

    let productMap = new Map<number, string>();

    if (productIds.length > 0) {
      const products = await this.ticketsRepo
        .createQueryBuilder()
        .select(['p.id', 'p.name'])
        .from('PT_Product', 'p')
        .where('p.id IN (:...ids)', { ids: productIds })
        .getMany();

      productMap = new Map<number, string>(
        products.map((p) => [p.id as number, p.name as string]),
      );
    }

    console.log('productMap', productMap);
    const userIds = [
      ...new Set(tickets.map((t) => t.assignedUser).filter(Boolean)),
    ];
    console.log('userIds', userIds);
    let userMap = new Map<string, string>();
    if (userIds.length > 0) {
      const users = await this.ticketsRepo
        .createQueryBuilder()
        .select(['u.Id AS id', 'u.Name AS name'])
        .from('AspNetUsers', 'u')
        .where('u.Id IN (:...ids)', { ids: userIds })
        .getRawMany<{ id: string; name: string }>();

      userMap = new Map<string, string>(users.map((u) => [u.id, u.name]));
    }
    console.log('userMap', userMap);
    const clean = (obj: Record<string, any>) =>
      Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

    return {
      total,
      data: tickets.map((ticket) => {
        const firstProductId =
          typeof ticket.ticketProducts === 'number'
            ? ticket.ticketProducts
            : Number((ticket.ticketProducts || '').split(',')[0].trim());

        return clean({
          id: ticket.id,
          name: ticket.name,
          phone: ticket.ticketPhone,
          email: ticket.ticketEmail,
          ticketName: ticket.ticketName,
          cc: ticket.ticketCc,
          products: ticket.ticketProducts,
          productName: productMap.get(firstProductId) ?? null,
          solution: ticket.ticketSolution,
          error: ticket.ticketError,
          dateCreate: ticket.dateCreate,
          dateSign: ticket.dateSign,
          assignedUserName: userMap.get(ticket.assignedUser ?? '') || null,
          statusLabel: statusMap[ticket.statusId ?? 0] || null,
        });
      }),
    };
  }
}
