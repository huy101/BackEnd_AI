import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__HUB_Shar__3214EC07167FD2DD", ["id"], { unique: true })
@Entity("HUB_ShareDocuments", { schema: "dbo" })
export class HubShareDocuments {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("nvarchar", { name: "Thumbnail", nullable: true, length: 255 })
  thumbnail: string | null;

  @Column("nvarchar", { name: "File", nullable: true, length: 1024 })
  file: string | null;

  @Column("datetime", { name: "DateCreate", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "DateEdit", nullable: true })
  dateEdit: Date | null;

  @Column("varchar", { name: "Code", nullable: true, length: 10 })
  code: string | null;

  @Column("varchar", { name: "Cat_List", nullable: true, length: 255 })
  catList: string | null;

  @Column("nvarchar", { name: "Title_En", nullable: true, length: 255 })
  titleEn: string | null;

  @Column("nvarchar", { name: "Description_En", nullable: true, length: 2048 })
  descriptionEn: string | null;

  @Column("nvarchar", { name: "File_En", nullable: true, length: 255 })
  fileEn: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;
}
