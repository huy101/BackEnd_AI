import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PtProduct } from './PtProduct';
import { PtCustomer } from './PtCustomer';

@Index('PK__PT_Suppl__3214EC07F6C4D981', ['id'], { unique: true })
@Entity('PT_Supplier', { schema: 'dbo' })
export class PtSupplier {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('nvarchar', { name: 'Name', nullable: true, length: 255 })
  name: string | null;

  @Column('nvarchar', { name: 'Address', nullable: true, length: 255 })
  address: string | null;

  @Column('nvarchar', { name: 'Phone', nullable: true, length: 50 })
  phone: string | null;

  @Column('nvarchar', { name: 'Email', nullable: true, length: 50 })
  email: string | null;

  @Column('nvarchar', { name: 'Phone2', nullable: true, length: 50 })
  phone2: string | null;

  @Column('nvarchar', { name: 'Email2', nullable: true, length: 50 })
  email2: string | null;

  @Column('nvarchar', { name: 'Note', nullable: true, length: 1024 })
  note: string | null;

  @Column('nvarchar', { name: 'Company', nullable: true, length: 255 })
  company: string | null;

  @Column('nvarchar', { name: 'Name2', nullable: true, length: 255 })
  name2: string | null;

  @OneToMany(() => PtProduct, (ptProduct) => ptProduct.supplier_2)
  ptProducts: PtProduct[];

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.ptSuppliers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Customer_Id', referencedColumnName: 'id' }])
  customer: PtCustomer;
}
