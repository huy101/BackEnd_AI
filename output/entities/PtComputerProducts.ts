import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { PtProduct } from "./PtProduct";
import { PtComputer } from "./PtComputer";

@Index("PK__PT_Compu__860AF017F540652D", ["idProduct", "idComputer"], {
  unique: true,
})
@Entity("PT_ComputerProducts", { schema: "dbo" })
export class PtComputerProducts {
  @Column("int", { primary: true, name: "Id_Product" })
  idProduct: number;

  @Column("int", { primary: true, name: "Id_Computer" })
  idComputer: number;

  @Column("int", { name: "Status", default: () => "(0)" })
  status: number;

  @Column("nvarchar", { name: "Note", nullable: true, length: 1024 })
  note: string | null;

  @Column("nvarchar", { name: "Software", nullable: true, length: 1024 })
  software: string | null;

  @Column("datetime", { name: "Date_Setup", nullable: true })
  dateSetup: Date | null;

  @Column("bit", { name: "UseMainUser", default: () => "(1)" })
  useMainUser: boolean;

  @Column("nvarchar", { name: "Email", nullable: true, length: 255 })
  email: string | null;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("bit", { name: "Server", default: () => "(0)" })
  server: boolean;

  @Column("int", { name: "Customer_Id", nullable: true })
  customerId: number | null;

  @ManyToOne(() => PtProduct, (ptProduct) => ptProduct.ptComputerProducts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Id_Product", referencedColumnName: "id" }])
  idProduct2: PtProduct;

  @ManyToOne(() => PtComputer, (ptComputer) => ptComputer.ptComputerProducts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Id_Computer", referencedColumnName: "id" }])
  idComputer2: PtComputer;
}
