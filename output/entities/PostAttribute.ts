import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostAttributeGroup } from "./PostAttributeGroup";
import { PostAttributePost } from "./PostAttributePost";
import { PostAttributePostCat } from "./PostAttributePostCat";
import { PostType } from "./PostType";
import { PostAttributeValue } from "./PostAttributeValue";

@Index("PK__PostAttr__3214EC0791273C42", ["id"], { unique: true })
@Index("UX_Code", ["code"], { unique: true })
@Entity("PostAttribute", { schema: "dbo" })
export class PostAttribute {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Code", nullable: true, length: 25 })
  code: string | null;

  @Column("nvarchar", { name: "Name", nullable: true, length: 140 })
  name: string | null;

  @Column("int", { name: "Edit_Type", nullable: true })
  editType: number | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 200 })
  description: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("bit", { name: "Filter", default: () => "(0)" })
  filter: boolean;

  @Column("bit", { name: "Attribute", default: () => "(0)" })
  attribute: boolean;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("bit", { name: "UseLang", default: () => "(0)" })
  useLang: boolean;

  @ManyToOne(
    () => PostAttributeGroup,
    (postAttributeGroup) => postAttributeGroup.postAttributes,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "Group", referencedColumnName: "id" }])
  group: PostAttributeGroup;

  @OneToMany(
    () => PostAttributePost,
    (postAttributePost) => postAttributePost.attribute
  )
  postAttributePosts: PostAttributePost[];

  @OneToMany(
    () => PostAttributePostCat,
    (postAttributePostCat) => postAttributePostCat.idAttribute2
  )
  postAttributePostCats: PostAttributePostCat[];

  @ManyToMany(() => PostType, (postType) => postType.postAttributes)
  @JoinTable({
    name: "PostAttribute_PostType",
    joinColumns: [{ name: "Id_Attribute", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "Id_PostType", referencedColumnName: "id" }],
    schema: "dbo",
  })
  postTypes: PostType[];

  @ManyToMany(() => PostType, (postType) => postType.postAttributes2)
  postTypes2: PostType[];

  @OneToMany(
    () => PostAttributeValue,
    (postAttributeValue) => postAttributeValue.attribute
  )
  postAttributeValues: PostAttributeValue[];
}
