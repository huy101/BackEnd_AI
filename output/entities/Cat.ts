import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostType } from "./PostType";
import { Post } from "./Post";
import { PostAttributePostCat } from "./PostAttributePostCat";
import { Slug } from "./Slug";

@Index("IX_MainLang", ["mainLangId", "lang"], {})
@Index("IX_TypeLang", ["type", "lang"], {})
@Index("PK__Cat__3214EC0758987383", ["id"], { unique: true })
@Entity("Cat", { schema: "dbo" })
export class Cat {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "Type", nullable: true })
  type: number | null;

  @Column("int", { name: "Level", nullable: true })
  level: number | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("nvarchar", { name: "Meta_Title", nullable: true, length: 300 })
  metaTitle: string | null;

  @Column("nvarchar", { name: "Meta_Key", nullable: true, length: 300 })
  metaKey: string | null;

  @Column("nvarchar", { name: "Meta_Description", nullable: true, length: 340 })
  metaDescription: string | null;

  @Column("nvarchar", { name: "Html_Head", nullable: true, length: 1024 })
  htmlHead: string | null;

  @Column("nvarchar", { name: "Image", nullable: true, length: 200 })
  image: string | null;

  @Column("bit", { name: "Active", default: () => "(1)" })
  active: boolean;

  @Column("varchar", { name: "Lang", nullable: true, length: 2 })
  lang: string | null;

  @Column("int", { name: "MainLang_Id", nullable: true })
  mainLangId: number | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 1024 })
  description: string | null;

  @Column("bit", { name: "Feature", default: () => "(0)" })
  feature: boolean;

  @Column("varchar", { name: "Banner_Image", nullable: true, length: 200 })
  bannerImage: string | null;

  @Column("ntext", { name: "Content", nullable: true })
  content: string | null;

  @Column("bit", { name: "Hot", default: () => "(0)" })
  hot: boolean;

  @Column("nvarchar", { name: "OtherSetting", nullable: true })
  otherSetting: string | null;

  @Column("bit", { name: "Draft", default: () => "(0)" })
  draft: boolean;

  @Column("varchar", { name: "Filter_List", nullable: true, length: 142 })
  filterList: string | null;

  @Column("varchar", { name: "Manufacturer_List", nullable: true, length: 142 })
  manufacturerList: string | null;

  @Column("bit", { name: "Separate_Filter", default: () => "(0)" })
  separateFilter: boolean;

  @ManyToOne(() => Cat, (cat) => cat.cats)
  @JoinColumn([{ name: "Owner_Id", referencedColumnName: "id" }])
  owner: Cat;

  @OneToMany(() => Cat, (cat) => cat.owner)
  cats: Cat[];

  @ManyToOne(() => PostType, (postType) => postType.cats, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Type", referencedColumnName: "id" }])
  type2: PostType;

  @ManyToMany(() => Post, (post) => post.cats)
  posts: Post[];

  @OneToMany(
    () => PostAttributePostCat,
    (postAttributePostCat) => postAttributePostCat.idCat2
  )
  postAttributePostCats: PostAttributePostCat[];

  @OneToMany(() => Slug, (slug) => slug.cat)
  slugs: Slug[];
}
