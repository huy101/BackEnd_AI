import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Index("IX_Post", ["postId"], {})
@Index("PK__Post_Var__3214EC07D19B6F62", ["id"], { unique: true })
@Entity("Post_Variations", { schema: "dbo" })
export class PostVariations {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "Post_Id", nullable: true })
  postId: number | null;

  @Column("nvarchar", { name: "Attribute_List", nullable: true, length: 255 })
  attributeList: string | null;

  @Column("bit", { name: "Main", default: () => "(0)" })
  main: boolean;

  @Column("decimal", { name: "Price", nullable: true, precision: 18, scale: 2 })
  price: number | null;

  @Column("decimal", {
    name: "Sale_Price",
    nullable: true,
    precision: 18,
    scale: 2,
  })
  salePrice: number | null;

  @Column("datetime", { name: "Sale_Start", nullable: true })
  saleStart: Date | null;

  @Column("datetime", { name: "Sale_End", nullable: true })
  saleEnd: Date | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("bit", { name: "NoShipping", default: () => "(0)" })
  noShipping: boolean;

  @Column("bit", { name: "Manage_Stock", default: () => "(0)" })
  manageStock: boolean;

  @Column("int", { name: "Stock_Quantity", nullable: true })
  stockQuantity: number | null;

  @Column("int", { name: "BackOrders", nullable: true })
  backOrders: number | null;

  @Column("bit", { name: "Out_Stock", default: () => "(0)" })
  outStock: boolean;

  @Column("decimal", {
    name: "Weight",
    nullable: true,
    precision: 18,
    scale: 2,
  })
  weight: number | null;

  @Column("nvarchar", { name: "Dimensions", nullable: true, length: 255 })
  dimensions: string | null;

  @Column("int", { name: "ShippingClass_Id", nullable: true })
  shippingClassId: number | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("int", { name: "Mediafile_Id", nullable: true })
  mediafileId: number | null;

  @Column("nvarchar", { name: "Image", nullable: true, length: 200 })
  image: string | null;

  @Column("bit", { name: "Sale_Time", default: () => "(0)" })
  saleTime: boolean;

  @Column("nvarchar", { name: "SKU", nullable: true, length: 128 })
  sku: string | null;

  @Column("nvarchar", { name: "Roles_Id", nullable: true, length: 128 })
  rolesId: string | null;

  @ManyToOne(() => Post, (post) => post.postVariations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Post_Id", referencedColumnName: "id" }])
  post: Post;
}
