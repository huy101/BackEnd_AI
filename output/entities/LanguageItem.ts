import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("IX_TypeLangCode", ["lang", "typeCode", "code"], {})
@Index("IX_TypeLangItemId", ["lang", "typeCode", "itemId"], {})
@Index("PK__Language__3214EC07A8BC720A", ["id"], { unique: true })
@Entity("LanguageItem", { schema: "dbo" })
export class LanguageItem {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Lang", nullable: true, length: 2 })
  lang: string | null;

  @Column("int", { name: "Item_Id", nullable: true })
  itemId: number | null;

  @Column("varchar", { name: "TypeCode", nullable: true, length: 25 })
  typeCode: string | null;

  @Column("nvarchar", { name: "Title", nullable: true, length: 3900 })
  title: string | null;

  @Column("varchar", { name: "Code", nullable: true, length: 35 })
  code: string | null;
}
