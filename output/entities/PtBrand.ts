import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PtProduct } from "./PtProduct";

@Index("PK__PT_Brand__3214EC07934248A5", ["id"], { unique: true })
@Entity("PT_Brand", { schema: "dbo" })
export class PtBrand {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "Logo", nullable: true, length: 255 })
  logo: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 1024 })
  description: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("nvarchar", { name: "Products", nullable: true, length: 1024 })
  products: string | null;

  @OneToMany(() => PtProduct, (ptProduct) => ptProduct.brand)
  ptProducts: PtProduct[];
}
