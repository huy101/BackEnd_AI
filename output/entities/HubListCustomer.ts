import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { HubList } from "./HubList";
import { PtCustomer } from "./PtCustomer";

@Index("PK__HUB_List__96183134CF9F0D62", ["idList", "idCustomer"], {
  unique: true,
})
@Entity("HUB_List_Customer", { schema: "dbo" })
export class HubListCustomer {
  @Column("int", { primary: true, name: "Id_List" })
  idList: number;

  @Column("int", { primary: true, name: "Id_Customer" })
  idCustomer: number;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("nvarchar", { name: "Note", nullable: true, length: 2048 })
  note: string | null;

  @Column("datetime", { name: "LastestEmail", nullable: true })
  lastestEmail: Date | null;

  @Column("datetime", { name: "LastestUpdate", nullable: true })
  lastestUpdate: Date | null;

  @Column("nvarchar", { name: "Step", nullable: true, length: 255 })
  step: string | null;

  @ManyToOne(() => HubList, (hubList) => hubList.hubListCustomers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Id_List", referencedColumnName: "id" }])
  idList2: HubList;

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.hubListCustomers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Id_Customer", referencedColumnName: "id" }])
  idCustomer2: PtCustomer;
}
