import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Knowledg__3214EC072F36B4BE", ["id"], { unique: true })
@Entity("HUB_Knowledge", { schema: "dbo" })
export class HubKnowledge {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 1024 })
  description: string | null;

  @Column("nvarchar", { name: "Content", nullable: true })
  content: string | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("nvarchar", { name: "Keywords", nullable: true, length: 1024 })
  keywords: string | null;

  @Column("datetime", { name: "CreateDate", nullable: true })
  createDate: Date | null;

  @Column("nvarchar", { name: "User_Create", nullable: true, length: 128 })
  userCreate: string | null;

  @Column("nvarchar", { name: "User_Edit", nullable: true, length: 128 })
  userEdit: string | null;

  @Column("datetime", { name: "EditDate", nullable: true })
  editDate: Date | null;
}
