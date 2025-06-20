// import { BaseEntity, DeleteResult, Repository } from 'typeorm';
// import { IBaseService } from './i.base.service';
// import { EntityId } from 'typeorm/repository/EntityId';

// export class BaseService<T extends BaseEntity, R extends Repository<T>>
//   implements IBaseService<T>
// {
//   protected readonly repository: R;

//   constructor(repository: R) {
//     this.repository = repository;
//   }

//   index(): Promise<T[]> {
//     return this.repository.find();
//   }

//   findById(id: EntityId): Promise<T | null> {
//     return this.repository.findOne({ where: { id } } as any);
//   }

//   findByIds(ids: EntityId[]): Promise<T[]> {
//     return this.repository.findByIds(ids);
//   }

//   store(data: any): Promise<T> {
//     return this.repository.save(data);
//   }

//   async update(id: EntityId, data: any): Promise<T> {
//     await this.repository.update(id, data);
//     return this.findById(id);
//   }

//   delete(id: EntityId): Promise<DeleteResult> {
//     return this.repository.delete(id);
//   }
// }
