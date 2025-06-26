import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HubProject } from './HubProject';
import { HubWorkingTask } from './HubWorkingTask';

@Index('PK__HUB_Proj__3214EC0794A6F6A6', ['id'], { unique: true })
@Entity('HUB_Project_Process', { schema: 'dbo' })
export class HubProjectProcess {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('nvarchar', { name: 'Title', nullable: true, length: 255 })
  title: string | null;

  @Column('datetime', { name: 'Deadline', nullable: true })
  deadline: Date | null;

  @Column('bit', { name: 'Lock', default: () => '(0)' })
  lock: boolean;

  @Column('bit', { name: 'Done', default: () => '(0)' })
  done: boolean;

  @Column('nvarchar', { name: 'Note', nullable: true, length: 2048 })
  note: string | null;

  @Column('datetime', { name: 'Date_Open', nullable: true })
  dateOpen: Date | null;

  @Column('datetime', { name: 'Date_End', nullable: true })
  dateEnd: Date | null;

  @Column('int', { name: 'Duration', nullable: true })
  duration: number | null;

  @Column('bit', { name: 'CountTime', default: () => '(0)' })
  countTime: boolean;

  @Column('int', { name: 'Status_Id', nullable: true })
  statusId: number | null;

  @Column('decimal', {
    name: 'Amount',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  amount: number | null;

  @Column('nvarchar', { name: 'User_Id', nullable: true, length: 128 })
  userId: string | null;

  @Column('int', { name: 'Percent', default: () => '(0)' })
  percent: number;

  @Column('int', { name: 'Order', nullable: true })
  order: number | null;

  @ManyToOne(() => HubProject, (hubProject) => hubProject.hubProjectProcesses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Project_Id', referencedColumnName: 'id' }])
  project: HubProject;

  @OneToMany(() => HubWorkingTask, (hubWorkingTask) => hubWorkingTask.process)
  hubWorkingTasks: HubWorkingTask[];
}
