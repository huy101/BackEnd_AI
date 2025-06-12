import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HubActivities } from './HubActivities';
import { HubContacts } from './HubContacts';
import { HubCustomerRe } from './HubCustomerRe';
import { HubListCustomer } from './HubListCustomer';
import { HubLogs } from './HubLogs';
import { HubProject } from './HubProject';
import { HubWorkingTask } from './HubWorkingTask';
import { HubCustomerStatus } from './HubCustomerStatus';
import { HubCustomerCat } from './HubCustomerCat';
import { PtProduct } from './PtProduct';
import { PtRoom } from './PtRoom';
import { PtSupplier } from './PtSupplier';
import { PtUseCase } from './PtUseCase';

@Index('PK__PT_Custo__3214EC070A697801', ['id'], { unique: true })
@Entity('PT_Customer', { schema: 'dbo' })
export class PtCustomer {
  @Column('nvarchar', { name: 'Name', nullable: true, length: 255 })
  name: string | null;

  @Column('nvarchar', { name: 'Note', nullable: true, length: 1024 })
  note: string | null;

  @Column('nvarchar', { name: 'Logo', nullable: true, length: 255 })
  logo: string | null;

  @Column('int', { name: 'CRM_Id', nullable: true })
  crmId: number | null;

  @Column('nvarchar', { name: 'Description', nullable: true, length: 255 })
  description: string | null;

  @Column('nvarchar', { name: 'FullName', nullable: true, length: 255 })
  fullName: string | null;

  @Column('nvarchar', { name: 'UserIds', nullable: true, length: 2048 })
  userIds: string | null;

  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('nvarchar', { name: 'CustomerNote', nullable: true, length: 1024 })
  customerNote: string | null;

  @Column('varchar', { name: 'Code', length: 10 })
  code: string;

  @Column('bit', { name: 'OneDesk', default: () => '(0)' })
  oneDesk: boolean;

  @Column('nvarchar', { name: 'MapLocation', nullable: true, length: 1024 })
  mapLocation: string | null;

  @Column('nvarchar', { name: 'Phone', nullable: true, length: 255 })
  phone: string | null;

  @Column('nvarchar', { name: 'Website', nullable: true, length: 255 })
  website: string | null;

  @Column('nvarchar', { name: 'Email', nullable: true, length: 255 })
  email: string | null;

  @Column('nvarchar', { name: 'HubNote', nullable: true, length: 2048 })
  hubNote: string | null;

  @Column('nvarchar', { name: 'AssignedUser', nullable: true })
  assignedUser: string | null;

  @Column('datetime', { name: 'DateAdd', nullable: true })
  dateAdd: Date | null;

  @Column('datetime', { name: 'LastEdit', nullable: true })
  lastEdit: Date | null;

  @Column('nvarchar', { name: 'Address', nullable: true, length: 1024 })
  address: string | null;

  @Column('int', { name: 'Owner_Type', nullable: true })
  ownerType: number | null;

  @Column('int', { name: 'Source', nullable: true })
  source: number | null;

  @Column('int', { name: 'City_Id', nullable: true })
  cityId: number | null;

  @Column('nvarchar', { name: 'Fields', nullable: true, length: 2048 })
  fields: string | null;

  @Column('bit', { name: 'FollowUserOnly', default: () => '(0)' })
  followUserOnly: boolean;

  @Column('nvarchar', { name: 'FollowUsers', nullable: true })
  followUsers: string | null;

  @Column('nvarchar', { name: 'UserCreate', nullable: true, length: 128 })
  userCreate: string | null;

  @Column('nvarchar', { name: 'FullName_en', nullable: true, length: 255 })
  fullNameEn: string | null;

  @Column('nvarchar', { name: 'Address_en', nullable: true, length: 1024 })
  addressEn: string | null;

  @Column('nvarchar', {
    name: 'Ticket_DefaultCC',
    nullable: true,
    length: 1024,
  })
  ticketDefaultCc: string | null;

  @Column('nvarchar', {
    name: 'Ticket_DefaultBCC',
    nullable: true,
    length: 1024,
  })
  ticketDefaultBcc: string | null;

  @Column('datetime', { name: 'LastUpdate', nullable: true })
  lastUpdate: Date | null;

  @Column('int', { name: 'Zone', nullable: true })
  zone: number | null;

  @Column('varchar', { name: 'Insight_Data', nullable: true })
  insightData: string | null;

  @Column('datetime', { name: 'Insight_LastUpdate', nullable: true })
  insightLastUpdate: Date | null;

  @Column('datetime', { name: 'Anniversary_Date', nullable: true })
  anniversaryDate: Date | null;

  @Column('int', { name: 'Level', nullable: true, default: () => '(0)' })
  level: number | null;

  @Column('nvarchar', { name: 'Slug', nullable: true, length: 255 })
  slug: string | null;

  @Column('nvarchar', { name: 'Keywords', nullable: true, length: 1024 })
  keywords: string | null;

  @OneToMany(() => HubActivities, (hubActivities) => hubActivities.customer)
  hubActivities: HubActivities[];

  @OneToMany(() => HubContacts, (hubContacts) => hubContacts.customer)
  hubContacts: HubContacts[];

  @OneToMany(() => HubCustomerRe, (hubCustomerRe) => hubCustomerRe.idCustomer)
  hubCustomerRes: HubCustomerRe[];

  @OneToMany(() => HubCustomerRe, (hubCustomerRe) => hubCustomerRe.idCustomer_3)
  hubCustomerRes2: HubCustomerRe[];

  @OneToMany(
    () => HubListCustomer,
    (hubListCustomer) => hubListCustomer.idCustomer2,
  )
  hubListCustomers: HubListCustomer[];

  @OneToMany(() => HubLogs, (hubLogs) => hubLogs.customer)
  hubLogs: HubLogs[];

  @OneToMany(() => HubProject, (hubProject) => hubProject.customer)
  hubProjects: HubProject[];

  @OneToMany(() => HubWorkingTask, (hubWorkingTask) => hubWorkingTask.customer)
  hubWorkingTasks: HubWorkingTask[];

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.ptCustomers)
  @JoinColumn([{ name: 'Owner_Customer_Id', referencedColumnName: 'id' }])
  ownerCustomer: PtCustomer;

  @OneToMany(() => PtCustomer, (ptCustomer) => ptCustomer.ownerCustomer)
  ptCustomers: PtCustomer[];

  @ManyToOne(
    () => HubCustomerStatus,
    (hubCustomerStatus) => hubCustomerStatus.ptCustomers,
    { onDelete: 'SET NULL', onUpdate: 'SET NULL' },
  )
  @JoinColumn([{ name: 'Status_Id', referencedColumnName: 'id' }])
  status: HubCustomerStatus;

  @ManyToOne(
    () => HubCustomerCat,
    (hubCustomerCat) => hubCustomerCat.ptCustomers,
  )
  @JoinColumn([{ name: 'Cat_Id', referencedColumnName: 'id' }])
  cat: HubCustomerCat;

  @OneToMany(() => PtProduct, (ptProduct) => ptProduct.customer)
  ptProducts: PtProduct[];

  @OneToMany(() => PtRoom, (ptRoom) => ptRoom.customer)
  ptRooms: PtRoom[];

  @OneToMany(() => PtSupplier, (ptSupplier) => ptSupplier.customer)
  ptSuppliers: PtSupplier[];

  @OneToMany(() => PtUseCase, (ptUseCase) => ptUseCase.customer)
  ptUseCases: PtUseCase[];
}
