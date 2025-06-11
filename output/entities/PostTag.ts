import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Index("PK__PostTag__3214EC07F1C5AE94", ["id"], { unique: true })
@Entity("PostTag", { schema: "dbo" })
export class PostTag {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 50 })
  name: string | null;

  @Column("varchar", { name: "Slug", nullable: true, length: 50 })
  slug: string | null;

  @Column("nvarchar", { name: "Type", nullable: true, length: 50 })
  type: string | null;

  @ManyToMany(() => Post, (post) => post.postTags)
  posts: Post[];
}
