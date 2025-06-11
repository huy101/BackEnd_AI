import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Log__3214EC070ED96269", ["id"], { unique: true })
@Entity("Log", { schema: "dbo" })
export class Log {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("datetime", { name: "Date", nullable: true })
  date: Date | null;

  @Column("datetime", { name: "Date2", nullable: true })
  date2: Date | null;

  @Column("varchar", { name: "ActionCode", nullable: true, length: 142 })
  actionCode: string | null;

  @Column("varchar", { name: "Type", nullable: true, length: 142 })
  type: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 1024 })
  description: string | null;

  @Column("int", { name: "Value_Id", nullable: true })
  valueId: number | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("nvarchar", { name: "User", nullable: true, length: 142 })
  user: string | null;

  @Column("nvarchar", { name: "Comment", nullable: true, length: 1024 })
  comment: string | null;

  @Column("bit", { name: "Highlight", default: () => "(0)" })
  highlight: boolean;

  @Column("int", { name: "Value_Id2", nullable: true })
  valueId2: number | null;

  @Column("int", { name: "Value_Id3", nullable: true })
  valueId3: number | null;

  @Column("nvarchar", { name: "Resource_Code", nullable: true, length: 142 })
  resourceCode: string | null;

  @Column("nvarchar", { name: "Function_Code", nullable: true, length: 142 })
  functionCode: string | null;

  @Column("nvarchar", { name: "Content", nullable: true })
  content: string | null;
}
