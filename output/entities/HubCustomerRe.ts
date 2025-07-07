import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { PtCustomer } from './PtCustomer';

@Index('PK__HUB_Cust__4FA5BAC9D4B1935A', ['idCustomer_1', 'idCustomer_2'], {
  unique: true,
})
@Entity('HUB_Customer_Re', { schema: 'dbo' })
export class HubCustomerRe {
  @Column('int', { primary: true, name: 'Id_Customer_1' })
  idCustomer_1: number;

  @Column('int', { primary: true, name: 'Id_Customer_2' })
  idCustomer_2: number;

  @Column('nvarchar', { name: 'Note', nullable: true, length: 2048 })
  note: string | null;

  @Column('nvarchar', { name: 'Tag', nullable: true, length: 255 })
  tag: string | null;

  @Column('nvarchar', { name: 'UserCreate', nullable: true, length: 128 })
  userCreate: string | null;

  @Column('datetime', { name: 'DateCreate', nullable: true })
  dateCreate: Date | null;

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.hubCustomerRes)
  @JoinColumn([{ name: 'Id_Customer_1', referencedColumnName: 'id' }])
  idCustomer: PtCustomer;

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.hubCustomerRes2)
  @JoinColumn([{ name: 'Id_Customer_2', referencedColumnName: 'id' }])
  idCustomer_3: PtCustomer;
}
