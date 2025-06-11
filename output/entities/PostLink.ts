import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__PostLink__3214EC07A7605FC8", ["id"], { unique: true })
@Entity("PostLink", { schema: "dbo" })
export class PostLink {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "Post_Id", nullable: true })
  postId: number | null;

  @Column("int", { name: "Link_Id", nullable: true })
  linkId: number | null;

  @Column("varchar", { name: "Type_Code", nullable: true, length: 15 })
  typeCode: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;
}
