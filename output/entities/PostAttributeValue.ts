import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostAttribute } from "./PostAttribute";

@Index("PK__PostAttr__3214EC0726EE8E65", ["id"], { unique: true })
@Index("UX_Code", ["code"], { unique: true })
@Entity("PostAttribute_Value", { schema: "dbo" })
export class PostAttributeValue {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Value", nullable: true, length: 100 })
  value: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("nvarchar", { name: "Title", nullable: true, length: 142 })
  title: string | null;

  @Column("nvarchar", { name: "Value_Long", nullable: true, length: 2048 })
  valueLong: string | null;

  @Column("varchar", { name: "Code", nullable: true, length: 60 })
  code: string | null;

  @ManyToOne(
    () => PostAttribute,
    (postAttribute) => postAttribute.postAttributeValues,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "Attribute", referencedColumnName: "id" }])
  attribute: PostAttribute;
}
