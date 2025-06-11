import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AspNetUsers } from "./AspNetUsers";
import { PostType } from "./PostType";

@Index("PK__User_Pos__BF241EB8701761D2", ["userId", "postTypeId"], {
  unique: true,
})
@Entity("User_PostType", { schema: "dbo" })
export class UserPostType {
  @Column("nvarchar", { primary: true, name: "User_Id", length: 128 })
  userId: string;

  @Column("int", { primary: true, name: "PostType_Id" })
  postTypeId: number;

  @Column("bit", { name: "View", default: () => "(0)" })
  view: boolean;

  @Column("bit", { name: "Create", default: () => "(0)" })
  create: boolean;

  @Column("bit", { name: "Edit", default: () => "(0)" })
  edit: boolean;

  @Column("bit", { name: "Delete", default: () => "(0)" })
  delete: boolean;

  @Column("bit", { name: "CatView", default: () => "(0)" })
  catView: boolean;

  @Column("bit", { name: "CatEdit", default: () => "(0)" })
  catEdit: boolean;

  @Column("bit", { name: "CatCreate", default: () => "(0)" })
  catCreate: boolean;

  @Column("bit", { name: "CatDelete", default: () => "(0)" })
  catDelete: boolean;

  @Column("bit", { name: "CanActive", default: () => "(0)" })
  canActive: boolean;

  @ManyToOne(() => AspNetUsers, (aspNetUsers) => aspNetUsers.userPostTypes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "User_Id", referencedColumnName: "id" }])
  user: AspNetUsers;

  @ManyToOne(() => PostType, (postType) => postType.userPostTypes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "PostType_Id", referencedColumnName: "id" }])
  postType: PostType;
}
