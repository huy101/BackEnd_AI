import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HubContacts } from './HubContacts';
import { PtCustomer } from './PtCustomer';
import { HubProject } from './HubProject';
import { HubFile } from './HubFile';
import { HubLogs } from './HubLogs';

@Index('PK__HUB_Acti__3214EC077859D0A0', ['id'], { unique: true })
@Entity('HUB_Activities', { schema: 'dbo' })
export class HubActivities {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('int', { name: 'Type', nullable: true })
  type: number | null;

  @Column('datetime', { name: 'DateCreate', nullable: true })
  dateCreate: Date | null;

  @Column('datetime', { name: 'DateUpdate', nullable: true })
  dateUpdate: Date | null;

  @Column('nvarchar', { name: 'Title', nullable: true, length: 255 })
  title: string | null;

  @Column('nvarchar', { name: 'Content', nullable: true })
  content: string | null;

  @Column('nvarchar', { name: 'Note', nullable: true, length: 2048 })
  note: string | null;

  @Column('nvarchar', { name: 'FollowUsers', nullable: true })
  followUsers: string | null;

  @Column('int', { name: 'Status', nullable: true })
  status: number | null;

  @Column('datetime', { name: 'DateDo', nullable: true })
  dateDo: Date | null;

  @Column('nvarchar', { name: 'User_Id', nullable: true, length: 128 })
  userId: string | null;

  @Column('bit', { name: 'FollowUserOnly', default: () => '(0)' })
  followUserOnly: boolean;

  @Column('int', { name: 'Group', nullable: true })
  group: number | null;

  @Column('int', { name: 'Source', nullable: true })
  source: number | null;

  @Column('varchar', { name: 'Keys', nullable: true, length: 255 })
  keys: string | null;

  @Column('varchar', { name: 'Fields', nullable: true, length: 255 })
  fields: string | null;

  @Column('bit', { name: 'Attachment', default: () => '(0)' })
  attachment: boolean;

  @Column('datetime', { name: 'DateEnd', nullable: true })
  dateEnd: Date | null;

  @Column('decimal', {
    name: 'LeaveCount',
    precision: 18,
    scale: 2,
    default: () => '(0)',
  })
  leaveCount: number;

  @Column('decimal', {
    name: 'UnpaidLeaveCount',
    precision: 18,
    scale: 2,
    default: () => '(0)',
  })
  unpaidLeaveCount: number;

  @Column('nvarchar', { name: 'Agenda', nullable: true })
  agenda: string | null;

  @Column('bit', { name: 'Bulletin', default: () => '(0)' })
  bulletin: boolean;

  @ManyToOne(() => HubContacts, (hubContacts) => hubContacts.hubActivities)
  @JoinColumn([{ name: 'Contact_Id', referencedColumnName: 'id' }])
  contact: HubContacts;

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.hubActivities)
  @JoinColumn([{ name: 'Customer_Id', referencedColumnName: 'id' }])
  customer: PtCustomer;

  @ManyToOne(() => HubProject, (hubProject) => hubProject.hubActivities)
  @JoinColumn([{ name: 'Project_Id', referencedColumnName: 'id' }])
  project: HubProject;

  @OneToMany(() => HubFile, (hubFile) => hubFile.activity)
  hubFiles: HubFile[];

  @OneToMany(() => HubLogs, (hubLogs) => hubLogs.activity)
  hubLogs: HubLogs[];
}
