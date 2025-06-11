import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cat } from "./Cat";
import { Post } from "./Post";
import { PostAttribute } from "./PostAttribute";
import { RolesPostType } from "./RolesPostType";
import { Slug } from "./Slug";
import { UserPostType } from "./UserPostType";

@Index("PK__PostType__3214EC0717C390CF", ["id"], { unique: true })
@Index("UX_Code", ["code"], { unique: true })
@Entity("PostType", { schema: "dbo" })
export class PostType {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 140 })
  name: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 200 })
  description: string | null;

  @Column("int", { name: "Group", nullable: true })
  group: number | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("bit", { name: "Menu", default: () => "(0)" })
  menu: boolean;

  @Column("bit", { name: "AsPost", default: () => "(0)" })
  asPost: boolean;

  @Column("bit", { name: "ShowType", default: () => "(0)" })
  showType: boolean;

  @Column("bit", { name: "QuickCreate", default: () => "(0)" })
  quickCreate: boolean;

  @Column("bit", { name: "DashboardStats", default: () => "(0)" })
  dashboardStats: boolean;

  @Column("bit", { name: "Has_Cat", default: () => "(0)" })
  hasCat: boolean;

  @Column("bit", { name: "Has_Description", default: () => "(0)" })
  hasDescription: boolean;

  @Column("bit", { name: "Has_Thumb", default: () => "(0)" })
  hasThumb: boolean;

  @Column("bit", { name: "Has_Content", default: () => "(0)" })
  hasContent: boolean;

  @Column("bit", { name: "Has_Price", default: () => "(0)" })
  hasPrice: boolean;

  @Column("bit", { name: "Has_Owner", default: () => "(0)" })
  hasOwner: boolean;

  @Column("bit", { name: "Has_Meta", default: () => "(0)" })
  hasMeta: boolean;

  @Column("bit", { name: "Has_Media", default: () => "(0)" })
  hasMedia: boolean;

  @Column("bit", { name: "Has_Create", default: () => "(0)" })
  hasCreate: boolean;

  @Column("bit", { name: "Has_User_Create", default: () => "(0)" })
  hasUserCreate: boolean;

  @Column("bit", { name: "Has_User_Edit", default: () => "(0)" })
  hasUserEdit: boolean;

  @Column("bit", { name: "Has_Date_Create", default: () => "(0)" })
  hasDateCreate: boolean;

  @Column("bit", { name: "Has_Date_Edit", default: () => "(0)" })
  hasDateEdit: boolean;

  @Column("bit", { name: "Has_Order", default: () => "(0)" })
  hasOrder: boolean;

  @Column("bit", { name: "Has_Lang", default: () => "(0)" })
  hasLang: boolean;

  @Column("bit", { name: "Has_Parallel_Language", default: () => "(0)" })
  hasParallelLanguage: boolean;

  @Column("bit", { name: "Has_Title", default: () => "(0)" })
  hasTitle: boolean;

  @Column("bit", { name: "Has_SpecialCat", default: () => "(0)" })
  hasSpecialCat: boolean;

  @Column("bit", { name: "Show_Thumb", default: () => "(0)" })
  showThumb: boolean;

  @Column("bit", { name: "Show_Cat", default: () => "(0)" })
  showCat: boolean;

  @Column("bit", { name: "Show_Slug", default: () => "(1)" })
  showSlug: boolean;

  @Column("bit", { name: "Has_Active", default: () => "(0)" })
  hasActive: boolean;

  @Column("varchar", { name: "Icon", nullable: true, length: 142 })
  icon: string | null;

  @Column("varchar", { name: "Code", nullable: true, length: 20 })
  code: string | null;

  @Column("bit", { name: "Has_feature", default: () => "(0)" })
  hasFeature: boolean;

  @Column("bit", { name: "Has_onsale", default: () => "(0)" })
  hasOnsale: boolean;

  @Column("bit", { name: "Has_oldprice", default: () => "(0)" })
  hasOldprice: boolean;

  @Column("bit", { name: "Has_CatImage", default: () => "(0)" })
  hasCatImage: boolean;

  @Column("bit", { name: "Has_CatDescription", default: () => "(0)" })
  hasCatDescription: boolean;

  @Column("bit", { name: "Has_Callforprice", default: () => "(0)" })
  hasCallforprice: boolean;

  @Column("bit", { name: "Has_Catfeature", default: () => "(0)" })
  hasCatfeature: boolean;

  @Column("bit", { name: "Has_MediaDescription", default: () => "(0)" })
  hasMediaDescription: boolean;

  @Column("bit", { name: "Has_CatBanner", default: () => "(0)" })
  hasCatBanner: boolean;

  @Column("bit", { name: "Has_New", default: () => "(0)" })
  hasNew: boolean;

  @Column("int", { name: "Cat_MaxLevel", nullable: true, default: () => "(1)" })
  catMaxLevel: number | null;

  @Column("int", {
    name: "Post_MaxLevel",
    nullable: true,
    default: () => "(1)",
  })
  postMaxLevel: number | null;

  @Column("nvarchar", { name: "Post_Name", nullable: true, length: 200 })
  postName: string | null;

  @Column("nvarchar", { name: "Cat_Name", nullable: true, length: 200 })
  catName: string | null;

  @Column("bit", { name: "Tags", default: () => "(0)" })
  tags: boolean;

  @Column("bit", { name: "IsProduct", default: () => "(0)" })
  isProduct: boolean;

  @Column("bit", { name: "Manufacturer", default: () => "(0)" })
  manufacturer: boolean;

  @Column("bit", { name: "ProductAttribute", default: () => "(0)" })
  productAttribute: boolean;

  @Column("bit", { name: "ProductOption", default: () => "(0)" })
  productOption: boolean;

  @Column("int", { name: "FrontEnd_Pages", nullable: true })
  frontEndPages: number | null;

  @Column("varchar", { name: "FrontEnd_ListView", nullable: true, length: 50 })
  frontEndListView: string | null;

  @Column("varchar", {
    name: "FrontEnd_DetailView",
    nullable: true,
    length: 50,
  })
  frontEndDetailView: string | null;

  @Column("bit", { name: "FrontEnd_PageList", default: () => "(0)" })
  frontEndPageList: boolean;

  @Column("bit", { name: "LoadPostOnType", default: () => "(1)" })
  loadPostOnType: boolean;

  @Column("bit", { name: "Slug_CatLevel", default: () => "(1)" })
  slugCatLevel: boolean;

  @Column("nvarchar", { name: "Resources", nullable: true, length: 1024 })
  resources: string | null;

  @Column("bit", { name: "Slug_Type", default: () => "(1)" })
  slugType: boolean;

  @Column("varchar", { name: "FrontEnd_TypeView", nullable: true, length: 50 })
  frontEndTypeView: string | null;

  @Column("bit", { name: "AsCat", default: () => "(1)" })
  asCat: boolean;

  @Column("nvarchar", { name: "Editor_Setting", nullable: true, length: 1024 })
  editorSetting: string | null;

  @Column("bit", { name: "LoadPostOnCat", default: () => "(0)" })
  loadPostOnCat: boolean;

  @Column("bit", { name: "Has_CatMediafiles", default: () => "(0)" })
  hasCatMediafiles: boolean;

  @Column("bit", { name: "Has_CatContent", default: () => "(0)" })
  hasCatContent: boolean;

  @Column("bit", { name: "Menu_Cat", default: () => "(0)" })
  menuCat: boolean;

  @Column("bit", { name: "Menu_Post", default: () => "(0)" })
  menuPost: boolean;

  @Column("bit", { name: "Variations_Product", default: () => "(0)" })
  variationsProduct: boolean;

  @Column("bit", { name: "Has_feature_2", default: () => "(0)" })
  hasFeature_2: boolean;

  @Column("bit", { name: "Has_CatFilters", default: () => "(0)" })
  hasCatFilters: boolean;

  @Column("nvarchar", { name: "Default_Sort", nullable: true, length: 20 })
  defaultSort: string | null;

  @Column("bit", { name: "Filter_WithGroup", default: () => "(0)" })
  filterWithGroup: boolean;

  @Column("bit", { name: "NotIncludePost_CatChild", default: () => "(0)" })
  notIncludePostCatChild: boolean;

  @OneToMany(() => Cat, (cat) => cat.type2)
  cats: Cat[];

  @OneToMany(() => Post, (post) => post.type2)
  posts: Post[];

  @ManyToMany(() => PostAttribute, (postAttribute) => postAttribute.postTypes)
  postAttributes: PostAttribute[];

  @ManyToMany(() => PostAttribute, (postAttribute) => postAttribute.postTypes2)
  @JoinTable({
    name: "PostAttribute_PostTypeCat",
    joinColumns: [{ name: "Id_PostType", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "Id_Attribute", referencedColumnName: "id" }],
    schema: "dbo",
  })
  postAttributes2: PostAttribute[];

  @OneToMany(() => RolesPostType, (rolesPostType) => rolesPostType.postType)
  rolesPostTypes: RolesPostType[];

  @OneToMany(() => Slug, (slug) => slug.postType)
  slugs: Slug[];

  @OneToMany(() => UserPostType, (userPostType) => userPostType.postType)
  userPostTypes: UserPostType[];
}
