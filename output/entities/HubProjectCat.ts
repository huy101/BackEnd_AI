import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HubProject } from './HubProject';

@Index('PK__Contract__3214EC0746E78A0C', ['id'], { unique: true })
@Entity('HUB_Project_Cat', { schema: 'dbo' })
export class HubProjectCat {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('nvarchar', { name: 'Name', nullable: true, length: 142 })
  name: string | null;

  @Column('int', { name: 'Order', nullable: true })
  order: number | null;

  @Column('nvarchar', { name: 'Description', nullable: true, length: 2048 })
  description: string | null;

  @Column('nvarchar', { name: 'Color', nullable: true, length: 10 })
  color: string | null;

  @OneToMany(() => HubProject, (hubProject) => hubProject.cat)
  hubProjects: HubProject[];
}
