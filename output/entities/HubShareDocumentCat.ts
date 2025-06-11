import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__HUB_Shar__3214EC076E6C29FF", ["id"], { unique: true })
@Entity("HUB_ShareDocument_Cat", { schema: "dbo" })
export class HubShareDocumentCat {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("varchar", { name: "Code", nullable: true, length: 15 })
  code: string | null;

  @Column("nvarchar", { name: "Thumbnail", nullable: true, length: 255 })
  thumbnail: string | null;

  @Column("nvarchar", { name: "Background", nullable: true, length: 255 })
  background: string | null;
}
