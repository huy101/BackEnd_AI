import {
  removeNullFieldsDeep,
  removeNullFromObject,
} from 'src/utils/removeNullFields';
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

  // async findProductsWithCustomerByName(
  //   name: string = '',
  //   skip = 0,
  //   take = 20,
  // ): Promise<{ data: any[]; total: number }> {
  //   const [data, total] = await this.ptProductRepo.findAndCount({
  //     where: {
  //       name: Like(`%${name}%`),
  //     },
  //     relations: ['customer', 'brand'],
  //     skip,
  //     take,
  //     order: {
  //       id: 'DESC',
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       dateActive: true,
  //       dateRenew: true,
  //       seats: true,
  //       customer: {
  //         id: true,
  //         name: true,
  //         fullName: true,
  //         assignedUser: true,
  //       },
  //       brand: {
  //         name: true,
  //       },
  //     },
  //   });

  //   // Lấy tất cả assignedUserId từ các sản phẩm
  //   const userIds = [
  //     ...new Set(
  //       data
  //         .flatMap((prod) =>
  //           prod.customer?.assignedUser
  //             ? prod.customer.assignedUser.split(',').map((id) => id.trim())
  //             : [],
  //         )
  //         .filter(Boolean),
  //     ),
  //   ];

  //   // Tạo map từ userId → name
  //   let userMap = new Map<string, string>();
  //   if (userIds.length > 0) {
  //     const users = await this.ptProductRepo
  //       .createQueryBuilder()
  //       .select(['u.Id AS id', 'u.Name AS name'])
  //       .from('AspNetUsers', 'u')
  //       .where('u.Id IN (:...ids)', { ids: userIds })
  //       .getRawMany<{ id: string; name: string }>();

  //     userMap = new Map(users.map((u) => [u.id, u.name]));
  //   }

  //   // Thêm field `assignedUserNames` vào từng sản phẩm
  //   const enrichedData = data.map((item) => {
  //     const ids = item.customer?.assignedUser
  //       ? item.customer.assignedUser.split(',').map((id) => id.trim())
  //       : [];

  //     const names = ids.map((id) => userMap.get(id)).filter(Boolean);
  //     const { assignedUser, ...restCustomer } = item.customer ?? {};

  //     return {
  //       ...item,
  //       customer: {
  //         ...restCustomer,
  //         assignedUserNames: names, // gán vào trong customer
  //       },
  //     };
  //   });

  //   return { data: enrichedData, total };
  // }
  async findProductsWithCustomerByName(
    productName: string = '',
    assignedUserName: string = '',
    skip = 0,
    take = 20,
  ): Promise<{ data: any[]; total: number }> {
    const query = this.ptProductRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.customer', 'customer')
      .leftJoinAndSelect('product.brand', 'brand')
      .where('1=1');

    if (productName) {
      query.andWhere('product.name LIKE :productName', {
        productName: `%${productName}%`,
      });
    }

    // Nếu có từ khoá tìm theo tên assignedUser
    if (assignedUserName) {
      // Tìm các user có tên giống
      const matchedUsers = await this.ptProductRepo
        .createQueryBuilder()
        .select(['u.Id AS id'])
        .from('AspNetUsers', 'u')
        .where('u.Name LIKE :name', { name: `%${assignedUserName}%` })
        .getRawMany<{ id: string }>();

      const matchedUserIds = matchedUsers.map((u) => u.id);

      // Nếu có user → dùng CHARINDEX thay cho LIKE %...%
      if (matchedUserIds.length > 0) {
        const conditions = matchedUserIds.map(
          (id) => `CHARINDEX('${id}', customer.assignedUser) > 0`,
        );
        query.andWhere(`(${conditions.join(' OR ')})`);
      }
    }

    const [products, total] = await query
      .select([
        'product.id',
        'product.name',
        'product.dateActive',
        'product.dateRenew',
        'product.seats',
        'product.renew',
        'customer.id',
        'customer.name',
        'customer.fullName',
        'customer.assignedUser',
        'brand.name',
      ])

      .skip(skip)
      .take(take)
      .orderBy('product.id', 'DESC')
      .getManyAndCount();

    // Lấy tất cả assignedUserId từ customer.assignedUser (có thể nhiều id ngăn cách bằng dấu phẩy)
    const userIds = [
      ...new Set(
        products
          .flatMap((prod) =>
            prod.customer?.assignedUser
              ? prod.customer.assignedUser.split(',').map((id) => id.trim())
              : [],
          )
          .filter(Boolean),
      ),
    ];

    // Map userId → name
    let userMap = new Map<string, string>();
    if (userIds.length > 0) {
      const chunkSize = 500;
      for (let i = 0; i < userIds.length; i += chunkSize) {
        const chunk = userIds.slice(i, i + chunkSize);
        const users = await this.ptProductRepo
          .createQueryBuilder()
          .select(['u.Id AS id', 'u.Name AS name'])
          .from('AspNetUsers', 'u')
          .where('u.Id IN (:...ids)', { ids: chunk })
          .getRawMany<{ id: string; name: string }>();

        users.forEach((u) => userMap.set(u.id, u.name));
      }
    }

    // Gắn assignedUserNames vào customer
    const enrichedData = products.map((item) => {
      const ids = item.customer?.assignedUser
        ? item.customer.assignedUser.split(',').map((id) => id.trim())
        : [];

      const names = ids.map((id) => userMap.get(id)).filter(Boolean);
      const { assignedUser, ...restCustomer } = item.customer ?? {};

      const result = {
        ...item,
        customer: {
          ...restCustomer,
          assignedUserNames: names,
        },
      };
      // If you want to clean the result, do it directly on 'result'
      const cleanedData = removeNullFieldsDeep([
        JSON.parse(JSON.stringify(result)),
      ])[0];
      return cleanedData;
    });

    return { data: enrichedData, total };
  }

  // async findListProducts(
  //   skip = 0,
  //   take = 20,
  // ): Promise<{ data: PtProduct[]; total: number }> {
  //   const [data, total] = await this.ptProductRepo.findAndCount({
  //     skip,
  //     take,
  //     relations: ['customer', 'brand'],
  //     select: {
  //       id: true,
  //       name: true,
  //       dateActive: true,
  //       seats: true,
  //       customer: {
  //         fullName: true,
  //       },
  //       brand: {
  //         name: true,
  //       },
  //     },
  //     order: {
  //       id: 'DESC',
  //     },
  //   });

  //   return { data, total };
  // }
  async getOverviewByName(name: string): Promise<any> {
    const product = await this.ptProductRepo.findOne({
      where: { name: Like(`%${name}%`) },
      relations: ['customer', 'brand', 'supplier_2'],
      order: { id: 'DESC' },
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm có tên giống`);
    }
    const clearData = {
      id: product.id,
      name: product.name,
      dateActive: product.dateActive,
      dateRenew: product.dateRenew,
      customerName: product.customer?.name || null,
      brand: product.brand?.name || null,
    };
    return { data: removeNullFieldsDeep([clearData])[0] };
  }

  async getDetailById(id: number): Promise<any> {
    const product = await this.ptProductRepo.findOne({
      where: { id },
      relations: ['customer', 'brand', 'supplier_2'],
    });

    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm ID: ${id}`);
    }
    const clearData = {
      id: product.id,
      name: product.name,
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
    return {
      data: removeNullFromObject(clearData),
    };
  }
}
