import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HubProject } from './HubProject';
import { HubWorkingTask } from './HubWorkingTask';
import { PtCustomer } from './PtCustomer';
import { HubActivities } from './HubActivities';

@Index('PK__HUB_Logs__3214EC07D50F9ED8', ['id'], { unique: true })
@Entity('HUB_Logs', { schema: 'dbo' })
export class HubLogs {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('datetime', { name: 'Date', nullable: true })
  date: Date | null;

  @Column('nvarchar', { name: 'Action', nullable: true, length: 255 })
  action: string | null;

  @Column('nvarchar', { name: 'DirectTag', nullable: true, length: 1024 })
  directTag: string | null;

  @Column('nvarchar', {
    name: 'ActionDescription',
    nullable: true,
    length: 1024,
  })
  actionDescription: string | null;

  @Column('int', { name: 'ShowId', nullable: true })
  showId: number | null;

  @Column('nvarchar', { name: 'TabName', nullable: true, length: 255 })
  tabName: string | null;

  @Column('nvarchar', { name: 'UserId', nullable: true, length: 128 })
  userId: string | null;

  @Column('decimal', {
    name: 'Amount',
    nullable: true,
    precision: 18,
    scale: 0,
  })
  amount: number | null;

  @ManyToOne(() => HubProject, (hubProject) => hubProject.hubLogs, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn([{ name: 'Project_Id', referencedColumnName: 'id' }])
  project: HubProject;

  @ManyToOne(() => HubWorkingTask, (hubWorkingTask) => hubWorkingTask.hubLogs, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn([{ name: 'Task_Id', referencedColumnName: 'id' }])
  task: HubWorkingTask;

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.hubLogs, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn([{ name: 'Customer_Id', referencedColumnName: 'id' }])
  customer: PtCustomer;

  @ManyToOne(() => HubActivities, (hubActivities) => hubActivities.hubLogs, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
  })
  @JoinColumn([{ name: 'Activity_Id', referencedColumnName: 'id' }])
  activity: HubActivities;
}
