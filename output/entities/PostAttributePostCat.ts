import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostAttribute } from "./PostAttribute";
import { Post } from "./Post";
import { Cat } from "./Cat";

@Index("IX_AttributeCat", ["idCat", "idAttribute"], {})
@Index("IX_AttributePost", ["idPost", "idAttribute"], {})
@Index("PK__PostAttr__3214EC07762CB393", ["id"], { unique: true })
@Entity("PostAttribute_PostCat", { schema: "dbo" })
export class PostAttributePostCat {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "Id_Post", nullable: true })
  idPost: number | null;

  @Column("int", { name: "Id_Attribute" })
  idAttribute: number;

  @Column("int", { name: "Id_Cat", nullable: true })
  idCat: number | null;

  @Column("nvarchar", { name: "Value", nullable: true })
  value: string | null;

  @Column("int", { name: "Value_Id", nullable: true })
  valueId: number | null;

  @Column("bit", { name: "Value_Bit", default: () => "(0)" })
  valueBit: boolean;

  @Column("varchar", { name: "Code", nullable: true, length: 142 })
  code: string | null;

  @Column("varchar", { name: "Lang", nullable: true, length: 10 })
  lang: string | null;

  @ManyToOne(
    () => PostAttribute,
    (postAttribute) => postAttribute.postAttributePostCats,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "Id_Attribute", referencedColumnName: "id" }])
  idAttribute2: PostAttribute;

  @ManyToOne(() => Post, (post) => post.postAttributePostCats, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Id_Post", referencedColumnName: "id" }])
  idPost2: Post;

  @ManyToOne(() => Cat, (cat) => cat.postAttributePostCats, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Id_Cat", referencedColumnName: "id" }])
  idCat2: Cat;
}
