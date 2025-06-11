import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PtComputerProducts } from './PtComputerProducts';
import { PtCustomer } from './PtCustomer';
import { PtBrand } from './PtBrand';
import { PtSupplier } from './PtSupplier';

@Index('PK__PT_Produ__3214EC071689D74C', ['id'], { unique: true })
@Entity('PT_Product', { schema: 'dbo' })
export class PtProduct {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('nvarchar', { name: 'Name', nullable: true, length: 255 })
  name: string | null;

  @Column('nvarchar', { name: 'Serial', nullable: true, length: 255 })
  serial: string | null;

  @Column('nvarchar', { name: 'Contract', nullable: true, length: 255 })
  contract: string | null;

  @Column('nvarchar', { name: 'Supplier', nullable: true, length: 255 })
  supplier: string | null;

  @Column('int', { name: 'Type', default: () => '(0)' })
  type: number;

  @Column('datetime', { name: 'Contract_Sign', nullable: true })
  contractSign: Date | null;

  @Column('datetime', { name: 'Date_Active', nullable: true })
  dateActive: Date | null;

  @Column('datetime', { name: 'Date_Renew', nullable: true })
  dateRenew: Date | null;

  @Column('int', { name: 'Seats', nullable: true, default: () => '(0)' })
  seats: number | null;

  @Column('bit', { name: 'Renew', default: () => '(1)' })
  renew: boolean;

  @Column('nvarchar', { name: 'Note', nullable: true, length: 1024 })
  note: string | null;

  @Column('int', { name: 'CMR_ProductId', nullable: true })
  cmrProductId: number | null;

  @Column('nvarchar', { name: 'Email', nullable: true, length: 255 })
  email: string | null;

  @Column('int', { name: 'SyncStatus', default: () => '(0)' })
  syncStatus: number;

  @Column('int', { name: 'Behavior', nullable: true })
  behavior: number | null;

  @Column('nvarchar', { name: 'Tags', nullable: true, length: 255 })
  tags: string | null;

  @Column('nvarchar', { name: 'Software_List', nullable: true, length: 1024 })
  softwareList: string | null;

  @Column('datetime', { name: 'LastestRenew', nullable: true })
  lastestRenew: Date | null;

  @Column('nvarchar', { name: 'BehaviorNote', nullable: true, length: 255 })
  behaviorNote: string | null;

  @Column('int', { name: 'ProductType', default: () => '(1)' })
  productType: number;

  @Column('bit', { name: 'Archive', default: () => '(0)' })
  archive: boolean;

  @Column('int', { name: 'CMR_CRMSiteId', nullable: true })
  cmrCrmSiteId: number | null;

  @Column('nvarchar', { name: 'TypeNote', nullable: true, length: 255 })
  typeNote: string | null;

  @Column('nvarchar', { name: 'CSN', nullable: true, length: 20 })
  csn: string | null;

  @Column('int', { name: 'usersAssigned', nullable: true })
  usersAssigned: number | null;

  @Column('int', { name: 'seatsInUse', nullable: true })
  seatsInUse: number | null;

  @Column('int', { name: 'tenantId', nullable: true })
  tenantId: number | null;

  @Column('nvarchar', { name: 'customerCSN', nullable: true, length: 20 })
  customerCsn: string | null;

  @Column('datetime', { name: 'Last_Insight_Update', nullable: true })
  lastInsightUpdate: Date | null;

  @Column('int', { name: 'assignmentRate', nullable: true })
  assignmentRate: number | null;

  @Column('int', { name: 'utilisationRate', nullable: true })
  utilisationRate: number | null;

  @Column('int', { name: 'usageRate', nullable: true })
  usageRate: number | null;

  @Column('varchar', { name: 'riskCategory', nullable: true, length: 10 })
  riskCategory: string | null;

  @OneToMany(
    () => PtComputerProducts,
    (ptComputerProducts) => ptComputerProducts.idProduct2,
  )
  ptComputerProducts: PtComputerProducts[];

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.ptProducts)
  @JoinColumn([{ name: 'Customer_Id', referencedColumnName: 'id' }])
  customer: PtCustomer;

  @ManyToOne(() => PtBrand, (ptBrand) => ptBrand.ptProducts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Brand_Id', referencedColumnName: 'id' }])
  brand: PtBrand;

  @ManyToOne(() => PtSupplier, (ptSupplier) => ptSupplier.ptProducts)
  @JoinColumn([{ name: 'Supplier_Id', referencedColumnName: 'id' }])
  supplier_2: PtSupplier;
}
