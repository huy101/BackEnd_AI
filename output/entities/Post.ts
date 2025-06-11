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
import { PostType } from "./PostType";
import { Manufacturer } from "./Manufacturer";
import { Cat } from "./Cat";
import { PostTag } from "./PostTag";
import { PostVariations } from "./PostVariations";
import { PostAttributePost } from "./PostAttributePost";
import { PostAttributePostCat } from "./PostAttributePostCat";
import { Slug } from "./Slug";

@Index("IX_MainLang", ["mainLangId", "lang"], {})
@Index("IX_TypeLang", ["type", "lang"], {})
@Index("PK__Post__3214EC0760C5F34C", ["id"], { unique: true })
@Entity("Post", { schema: "dbo" })
export class Post {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("ntext", { name: "Content", nullable: true })
  content: string | null;

  @Column("nvarchar", { name: "Thumb", nullable: true, length: 200 })
  thumb: string | null;

  @Column("int", { name: "Type", nullable: true })
  type: number | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("nvarchar", { name: "Meta_Title", nullable: true, length: 300 })
  metaTitle: string | null;

  @Column("nvarchar", { name: "Meta_key", nullable: true, length: 300 })
  metaKey: string | null;

  @Column("nvarchar", { name: "Meta_Description", nullable: true, length: 340 })
  metaDescription: string | null;

  @Column("nvarchar", { name: "Html_Head", nullable: true, length: 1024 })
  htmlHead: string | null;

  @Column("int", { name: "Level", nullable: true })
  level: number | null;

  @Column("nvarchar", { name: "User_Create", nullable: true, length: 100 })
  userCreate: string | null;

  @Column("nvarchar", { name: "User_Edit", nullable: true, length: 100 })
  userEdit: string | null;

  @Column("datetime", { name: "Date_Create", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "Date_Edit", nullable: true })
  dateEdit: Date | null;

  @Column("varchar", { name: "Lang", nullable: true, length: 2 })
  lang: string | null;

  @Column("int", { name: "MainLang_Id", nullable: true })
  mainLangId: number | null;

  @Column("bit", { name: "Active", default: () => "(1)" })
  active: boolean;

  @Column("nvarchar", { name: "Code", nullable: true, length: 255 })
  code: string | null;

  @Column("int", { name: "Rate", nullable: true })
  rate: number | null;

  @Column("decimal", { name: "Price", nullable: true, precision: 18, scale: 2 })
  price: number | null;

  @Column("decimal", {
    name: "Price_Old",
    nullable: true,
    precision: 18,
    scale: 2,
  })
  priceOld: number | null;

  @Column("bit", { name: "feature", default: () => "(0)" })
  feature: boolean;

  @Column("bit", { name: "onsale", default: () => "(0)" })
  onsale: boolean;

  @Column("bit", { name: "Callforprice", default: () => "(0)" })
  callforprice: boolean;

  @Column("bit", { name: "newpost", default: () => "(0)" })
  newpost: boolean;

  @Column("int", { name: "Group_Id", nullable: true })
  groupId: number | null;

  @Column("int", { name: "ViewedCount", nullable: true })
  viewedCount: number | null;

  @Column("int", { name: "ViewedCountStart", nullable: true })
  viewedCountStart: number | null;

  @Column("nvarchar", { name: "SKU", nullable: true, length: 50 })
  sku: string | null;

  @Column("int", { name: "MainPost_Id", nullable: true })
  mainPostId: number | null;

  @Column("bit", { name: "Draft", default: () => "(0)" })
  draft: boolean;

  @Column("nvarchar", { name: "OtherSetting", nullable: true })
  otherSetting: string | null;

  @Column("bit", { name: "feature_2", default: () => "(0)" })
  feature_2: boolean;

  @ManyToOne(() => PostType, (postType) => postType.posts)
  @JoinColumn([{ name: "Type", referencedColumnName: "id" }])
  type2: PostType;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.posts)
  @JoinColumn([{ name: "Manufaturer_Id", referencedColumnName: "id" }])
  manufaturer: Manufacturer;

  @ManyToOne(() => Post, (post) => post.posts)
  @JoinColumn([{ name: "Owner_Id", referencedColumnName: "id" }])
  owner: Post;

  @OneToMany(() => Post, (post) => post.owner)
  posts: Post[];

  @ManyToMany(() => Cat, (cat) => cat.posts)
  @JoinTable({
    name: "Post_Cat",
    joinColumns: [{ name: "Id_Post", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "Id_Cat", referencedColumnName: "id" }],
    schema: "dbo",
  })
  cats: Cat[];

  @ManyToMany(() => PostTag, (postTag) => postTag.posts)
  @JoinTable({
    name: "Post_PostTag",
    joinColumns: [{ name: "Id_Post", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "Id_Tag", referencedColumnName: "id" }],
    schema: "dbo",
  })
  postTags: PostTag[];

  @OneToMany(() => PostVariations, (postVariations) => postVariations.post)
  postVariations: PostVariations[];

  @OneToMany(
    () => PostAttributePost,
    (postAttributePost) => postAttributePost.post
  )
  postAttributePosts: PostAttributePost[];

  @OneToMany(
    () => PostAttributePostCat,
    (postAttributePostCat) => postAttributePostCat.idPost2
  )
  postAttributePostCats: PostAttributePostCat[];

  @OneToMany(() => Slug, (slug) => slug.post)
  slugs: Slug[];
}
