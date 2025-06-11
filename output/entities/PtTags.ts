import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__PT_Tags__3214EC07C9AB36B7", ["id"], { unique: true })
@Entity("PT_Tags", { schema: "dbo" })
export class PtTags {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "Type", nullable: true })
  type: number | null;

  @Column("nvarchar", { name: "Color", nullable: true, length: 20 })
  color: string | null;

  @Column("int", { name: "Customer_Id", nullable: true })
  customerId: number | null;
}
