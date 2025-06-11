import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cat } from "./Cat";
import { PostType } from "./PostType";
import { Post } from "./Post";

@Index("IX_Alias", ["alias"], {})
@Index("IX_SlugFullLang", ["slugFull", "lang"], {})
@Index("PK__Slug__3214EC070A76B176", ["id"], { unique: true })
@Entity("Slug", { schema: "dbo" })
export class Slug {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Slug", nullable: true, length: 142 })
  slug: string | null;

  @Column("int", { name: "Slug_Count", nullable: true })
  slugCount: number | null;

  @Column("varchar", { name: "Slug_Full", nullable: true, length: 142 })
  slugFull: string | null;

  @Column("varchar", { name: "Lang", nullable: true, length: 2 })
  lang: string | null;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("bit", { name: "UseLang", default: () => "(0)" })
  useLang: boolean;

  @Column("int", { name: "MainSlug", nullable: true })
  mainSlug: number | null;

  @Column("varchar", { name: "Alias", nullable: true, length: 200 })
  alias: string | null;

  @ManyToOne(() => Cat, (cat) => cat.slugs)
  @JoinColumn([{ name: "Cat", referencedColumnName: "id" }])
  cat: Cat;

  @ManyToOne(() => PostType, (postType) => postType.slugs)
  @JoinColumn([{ name: "PostType", referencedColumnName: "id" }])
  postType: PostType;

  @ManyToOne(() => Post, (post) => post.slugs)
  @JoinColumn([{ name: "Post", referencedColumnName: "id" }])
  post: Post;
}
