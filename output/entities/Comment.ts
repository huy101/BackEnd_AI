import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Index("IX_Object", ["objectId", "objectType"], {})
@Index("IX_Quote", ["quoteId"], {})
@Index("PK__Comment__3214EC07BBD87F63", ["id"], { unique: true })
@Entity("Comment", { schema: "dbo" })
export class Comment {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "Object_Id", nullable: true })
  objectId: number | null;

  @Column("nvarchar", { name: "User_Id", nullable: true, length: 128 })
  userId: string | null;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 142 })
  email: string | null;

  @Column("nvarchar", { name: "Content", nullable: true })
  content: string | null;

  @Column("int", { name: "Quote_Id", nullable: true })
  quoteId: number | null;

  @Column("int", { name: "Post_Rate", nullable: true })
  postRate: number | null;

  @Column("datetime", { name: "DateCreate", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "DateEdit", nullable: true })
  dateEdit: Date | null;

  @Column("varchar", { name: "Object_Type", nullable: true, length: 10 })
  objectType: string | null;

  @Column("bit", { name: "Report", default: () => "(0)" })
  report: boolean;

  @Column("int", { name: "Like", nullable: true })
  like: number | null;

  @Column("bit", { name: "Active", default: () => "(1)" })
  active: boolean;

  @Column("varchar", { name: "User_Like", nullable: true, length: 1024 })
  userLike: string | null;

  @Column("nvarchar", { name: "User_Report", nullable: true, length: 142 })
  userReport: string | null;

  @Column("nvarchar", { name: "Url", nullable: true, length: 142 })
  url: string | null;

  @Column("nvarchar", { name: "Phone", nullable: true, length: 142 })
  phone: string | null;

  @Column("nvarchar", { name: "Info", nullable: true, length: 1024 })
  info: string | null;

  @Column("nvarchar", { name: "Website", nullable: true, length: 142 })
  website: string | null;

  @ManyToOne(() => Comment, (comment) => comment.comments)
  @JoinColumn([{ name: "Quote_Id", referencedColumnName: "id" }])
  quote: Comment;

  @OneToMany(() => Comment, (comment) => comment.quote)
  comments: Comment[];
}
