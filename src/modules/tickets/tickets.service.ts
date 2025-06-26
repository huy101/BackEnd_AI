import { Injectable, NotFoundException } from '@nestjs/common';
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
  async getTicketsByStatus(input?: string | number) {
    let statusId: number | undefined = undefined;

    if (typeof input === 'string') {
      statusId = findStatusIdByFuzzyText(input);
    } else if (typeof input === 'number') {
      statusId = input;
    }

    const query = this.ticketsRepo
      .createQueryBuilder('project')
      .where('project.type = :type', { type: 10 });

    if (statusId) {
      query.andWhere('project.statusId = :status', { status: statusId });
    }

    const tickets = await query
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
      ])
      .orderBy('project.dateCreate', 'DESC')
      .getMany();

    return tickets.map((ticket) => ({
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
      statusLabel: statusMap[ticket.statusId ?? 0] || null,
    }));
  }
}
