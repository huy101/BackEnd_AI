import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HubListTask } from './HubListTask';
import { HubLogs } from './HubLogs';
import { HubProjectProcess } from './HubProjectProcess';
import { HubProject } from './HubProject';
import { PtCustomer } from './PtCustomer';
import { HubWorkingTaskSpace } from './HubWorkingTaskSpace';
import { HubWorkingTaskSub } from './HubWorkingTaskSub';

@Index('PK__WorkingT__3214EC0771D1E811', ['id'], { unique: true })
@Entity('HUB_WorkingTask', { schema: 'dbo' })
export class HubWorkingTask {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('nvarchar', { name: 'Title', nullable: true, length: 142 })
  title: string | null;

  @Column('nvarchar', { name: 'Description', nullable: true })
  description: string | null;

  @Column('datetime', { name: 'DueDate', nullable: true })
  dueDate: Date | null;

  @Column('nvarchar', { name: 'Color', nullable: true, length: 10 })
  color: string | null;

  @Column('bit', { name: 'Archive', default: () => '(0)' })
  archive: boolean;

  @Column('int', { name: 'Type', default: () => '(1)' })
  type: number;

  @Column('nvarchar', { name: 'SubTask', nullable: true })
  subTask: string | null;

  @Column('nvarchar', { name: 'AssignedUser', nullable: true, length: 1024 })
  assignedUser: string | null;

  @Column('nvarchar', { name: 'FollowUsers', nullable: true })
  followUsers: string | null;

  @Column('int', { name: 'Order', nullable: true })
  order: number | null;

  @Column('int', { name: 'Percent', default: () => '(0)' })
  percent: number;

  @Column('bit', { name: 'FollowUserOnly', default: () => '(0)' })
  followUserOnly: boolean;

  @Column('nvarchar', { name: 'UserCreate', nullable: true, length: 128 })
  userCreate: string | null;

  @Column('bit', { name: 'Attachment', default: () => '(0)' })
  attachment: boolean;

  @Column('datetime', { name: 'StartDate', nullable: true })
  startDate: Date | null;

  @OneToMany(() => HubListTask, (hubListTask) => hubListTask.idTask2)
  hubListTasks: HubListTask[];

  @OneToMany(() => HubLogs, (hubLogs) => hubLogs.task)
  hubLogs: HubLogs[];

  @ManyToOne(
    () => HubProjectProcess,
    (hubProjectProcess) => hubProjectProcess.hubWorkingTasks,
  )
  @JoinColumn([{ name: 'Process_Id', referencedColumnName: 'id' }])
  process: HubProjectProcess;

  @ManyToOne(() => HubProject, (hubProject) => hubProject.hubWorkingTasks)
  @JoinColumn([{ name: 'Project_Id', referencedColumnName: 'id' }])
  project: HubProject;

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.hubWorkingTasks)
  @JoinColumn([{ name: 'Customer_Id', referencedColumnName: 'id' }])
  customer: PtCustomer;

  @ManyToOne(
    () => HubWorkingTaskSpace,
    (hubWorkingTaskSpace) => hubWorkingTaskSpace.hubWorkingTasks,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'Space_Id', referencedColumnName: 'id' }])
  space: HubWorkingTaskSpace;

  @OneToMany(
    () => HubWorkingTaskSub,
    (hubWorkingTaskSub) => hubWorkingTaskSub.task,
  )
  hubWorkingTaskSubs: HubWorkingTaskSub[];
}
