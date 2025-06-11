import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PtCustomer } from "./PtCustomer";

@Index("PK__HUB_Cust__3214EC076F0C3691", ["id"], { unique: true })
@Entity("HUB_Customer_Status", { schema: "dbo" })
export class HubCustomerStatus {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @ManyToOne(
    () => HubCustomerStatus,
    (hubCustomerStatus) => hubCustomerStatus.hubCustomerStatuses
  )
  @JoinColumn([{ name: "Owner_Id", referencedColumnName: "id" }])
  owner: HubCustomerStatus;

  @OneToMany(
    () => HubCustomerStatus,
    (hubCustomerStatus) => hubCustomerStatus.owner
  )
  hubCustomerStatuses: HubCustomerStatus[];

  @OneToMany(() => PtCustomer, (ptCustomer) => ptCustomer.status)
  ptCustomers: PtCustomer[];
}
