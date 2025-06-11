import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AspNetRoles } from "./AspNetRoles";
import { PostType } from "./PostType";

@Index("PK__Roles_Po__47433B7321AB80FB", ["roleId", "postTypeId"], {
  unique: true,
})
@Entity("Roles_PostType", { schema: "dbo" })
export class RolesPostType {
  @Column("nvarchar", { primary: true, name: "Role_Id", length: 128 })
  roleId: string;

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

  @Column("bit", { name: "Images_PerUser", default: () => "(0)" })
  imagesPerUser: boolean;

  @Column("bit", { name: "CanActive", default: () => "(0)" })
  canActive: boolean;

  @ManyToOne(() => AspNetRoles, (aspNetRoles) => aspNetRoles.rolesPostTypes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Role_Id", referencedColumnName: "id" }])
  role: AspNetRoles;

  @ManyToOne(() => PostType, (postType) => postType.rolesPostTypes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "PostType_Id", referencedColumnName: "id" }])
  postType: PostType;
}
