import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Email_Te__3214EC07BE20BFEA", ["id"], { unique: true })
@Entity("Email_Template", { schema: "dbo" })
export class EmailTemplate {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Code", nullable: true, length: 25 })
  code: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 1024 })
  description: string | null;

  @Column("nvarchar", { name: "Content", nullable: true })
  content: string | null;

  @Column("nvarchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;
}
