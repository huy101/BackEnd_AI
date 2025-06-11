import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Language__3214EC0703EA4D14", ["id"], { unique: true })
@Index("UX_Code", ["code"], { unique: true })
@Entity("Language", { schema: "dbo" })
export class Language {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "FullCode", nullable: true, length: 10 })
  fullCode: string | null;

  @Column("varchar", { name: "Code", nullable: true, length: 2 })
  code: string | null;

  @Column("varchar", { name: "Flag", nullable: true, length: 100 })
  flag: string | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("bit", { name: "Construction", default: () => "(0)" })
  construction: boolean;

  @Column("bit", { name: "Admin", default: () => "(1)" })
  admin: boolean;
}
