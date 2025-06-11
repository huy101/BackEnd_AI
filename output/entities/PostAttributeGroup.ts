import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostAttribute } from "./PostAttribute";

@Index("PK__PostAttr__3214EC070AFD6A57", ["id"], { unique: true })
@Entity("PostAttribute_Group", { schema: "dbo" })
export class PostAttributeGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Code", nullable: true, length: 50 })
  code: string | null;

  @Column("nvarchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 200 })
  description: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("bit", { name: "CustomField", default: () => "(0)" })
  customField: boolean;

  @OneToMany(() => PostAttribute, (postAttribute) => postAttribute.group)
  postAttributes: PostAttribute[];
}
