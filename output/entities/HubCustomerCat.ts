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

@Index("PK__Customer__3214EC074F7CD00D", ["id"], { unique: true })
@Entity("HUB_Customer_Cat", { schema: "dbo" })
export class HubCustomerCat {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("nvarchar", { name: "FollowUsers", nullable: true })
  followUsers: string | null;

  @ManyToOne(
    () => HubCustomerCat,
    (hubCustomerCat) => hubCustomerCat.hubCustomerCats
  )
  @JoinColumn([{ name: "Cat_Owner", referencedColumnName: "id" }])
  catOwner: HubCustomerCat;

  @OneToMany(() => HubCustomerCat, (hubCustomerCat) => hubCustomerCat.catOwner)
  hubCustomerCats: HubCustomerCat[];

  @OneToMany(() => PtCustomer, (ptCustomer) => ptCustomer.cat)
  ptCustomers: PtCustomer[];
}
