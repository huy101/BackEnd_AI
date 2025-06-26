import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PtProduct } from 'output/entities/PtProduct';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PtProductService {
  constructor(
    @InjectRepository(PtProduct)
    private readonly ptProductRepo: Repository<PtProduct>,
  ) {}

  async findAll(skip = 0, take = 50): Promise<PtProduct[]> {
    return this.ptProductRepo.find({
      skip,
      take,
      order: { id: 'DESC' },

      relations: ['brand'],
    });
  }

  async findProductsWithCustomerByName(
    name: string = '',
    skip = 0,
    take = 20,
  ): Promise<{ data: any[]; total: number }> {
    const [data, total] = await this.ptProductRepo.findAndCount({
      where: {
        name: Like(`%${name}%`),
      },
      relations: ['customer', 'brand'],
      skip,
      take,
      order: {
        id: 'DESC',
      },
      select: {
        id: true,
        name: true,
        dateActive: true,
        dateRenew: true,
        seatsInUse: true,
        customer: {
          id: true,
          name: true,
          fullName: true,
          assignedUser: true,
        },
        brand: {
          name: true,
        },
      },
    });

    return { data, total };
  }

  async findListProducts(
    skip = 0,
    take = 20,
  ): Promise<{ data: PtProduct[]; total: number }> {
    const [data, total] = await this.ptProductRepo.findAndCount({
      skip,
      take,
      relations: ['customer', 'brand'],
      select: {
        id: true,
        name: true,
        dateActive: true,
        seats: true,
        customer: {
          fullName: true,
        },
        brand: {
          name: true,
        },
      },
      order: {
        id: 'DESC',
      },
    });

    return { data, total };
  }
  async getOverviewByName(name: string): Promise<any> {
    const product = await this.ptProductRepo.findOne({
      where: { name: Like(`%${name}%`) },
      relations: ['customer', 'brand', 'supplier_2'],
      order: { id: 'DESC' },
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có tên giống`);
    }

    return {
      id: product.id,
      name: product.name,
      serial: product.serial,
      contract: product.contract,
      dateActive: product.dateActive,
      dateRenew: product.dateRenew,
      customerName: product.customer?.name || null,
      brand: product.brand?.name || null,
      supplier: product.supplier_2?.name || product.supplier || null,
    };
  }
  async getDetailById(id: number): Promise<any> {
    const product = await this.ptProductRepo.findOne({
      where: { id },
      relations: ['customer', 'brand', 'supplier_2'],
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm ID: ${id}`);
    }

    return {
      id: product.id,
      name: product.name,
      serial: product.serial,
      contract: product.contract,
      contractSign: product.contractSign,
      dateActive: product.dateActive,
      dateRenew: product.dateRenew,
      lastestRenew: product.lastestRenew,
      seats: product.seats,
      seatsInUse: product.seatsInUse,
      usersAssigned: product.usersAssigned,
      assignmentRate: product.assignmentRate,
      utilisationRate: product.utilisationRate,
      usageRate: product.usageRate,
      productType: product.productType,
      type: product.type,
      behavior: product.behavior,
      behaviorNote: product.behaviorNote,
      riskCategory: product.riskCategory,
      softwareList: product.softwareList,
      note: product.note,
      tags: product.tags,
      csn: product.csn,
      customerCsn: product.customerCsn,
      email: product.email,
      archive: product.archive,
      syncStatus: product.syncStatus,
      lastInsightUpdate: product.lastInsightUpdate,
      customer: product.customer?.name || null,
      brand: product.brand?.name || null,
      supplier: product.supplier_2?.name || product.supplier || null,
    };
  }
}
