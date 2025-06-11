import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Post } from "./Post";

@Index("PK__Manufact__3214EC07BC098FCB", ["id"], { unique: true })
@Index("UX_Link", ["link"], { unique: true })
@Entity("Manufacturer", { schema: "dbo" })
export class Manufacturer {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("varchar", { name: "Logo", nullable: true, length: 1024 })
  logo: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 142 })
  email: string | null;

  @Column("varchar", { name: "Phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("bit", { name: "Active", default: () => "(1)" })
  active: boolean;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("varchar", { name: "Link", nullable: true, length: 142 })
  link: string | null;

  @Column("nvarchar", { name: "Website", nullable: true, length: 255 })
  website: string | null;

  @OneToMany(() => Post, (post) => post.manufaturer)
  posts: Post[];
}
