import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HubProject } from 'output/entities/HubProject';
import { Repository } from 'typeorm';
import {
  findStatusIdByFuzzyText,
  statusMap,
} from '../../utils/utils/normalize';

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
  async getTicketsByStatus(input?: string | number, skip = 0, take = 20) {
    let statusId: number | undefined = undefined;

    if (typeof input === 'string') {
      statusId = findStatusIdByFuzzyText(input);
    } else if (typeof input === 'number') {
      statusId = input;
    }

    const query = this.ticketsRepo
      .createQueryBuilder('project')
      .where('project.type = :type', { type: 10 });

    if (statusId !== undefined) {
      query.andWhere('project.statusId = :status', { status: statusId });
    }

    const [tickets, total] = await query
      .select([
        'project.id',
        'project.name',
        'project.ticketName',
        'project.ticketPhone',
        'project.ticketEmail',
        'project.ticketCc',
        'project.ticketBcc',
        'project.ticketProducts',
        'project.ticketSolution',
        'project.ticketError',
        'project.ticketEmailDate',
        'project.dateCreate',
        'project.dateSign',
        'project.statusId',
        'project.assignedUser',
      ])
      .orderBy('project.dateCreate', 'DESC')
      .skip(skip)
      .take(take)
      .getManyAndCount();

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

    return {
      total,
      data: tickets.map((ticket) => ({
        id: ticket.id,
        name: ticket.name,
        phone: ticket.ticketPhone,
        email: ticket.ticketEmail,
        ticketName: ticket.ticketName,
        cc: ticket.ticketCc,
        bcc: ticket.ticketBcc,
        products: ticket.ticketProducts,
        solution: ticket.ticketSolution,
        error: ticket.ticketError,
        emailDate: ticket.ticketEmailDate,
        dateCreate: ticket.dateCreate,
        dateSign: ticket.dateSign,
        statusId: ticket.statusId,
        assignedUser: ticket.assignedUser,
        assignedUserName: userMap.get(ticket.assignedUser ?? '') || null,
        statusLabel: statusMap[ticket.statusId ?? 0] || null,
      })),
    };
  }
}
