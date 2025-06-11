import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_ContentType", ["contentId", "type"], {})
@Index("PK__MediaFil__3214EC07BBEE9298", ["id"], { unique: true })
@Entity("MediaFiles", { schema: "dbo" })
export class MediaFiles {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "URL", nullable: true, length: 200 })
  url: string | null;

  @Column("int", { name: "Content_Id", nullable: true })
  contentId: number | null;

  @Column("varchar", { name: "Type", nullable: true, length: 15 })
  type: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 142 })
  description: string | null;
}
