import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AspNetRoles } from "./AspNetRoles";
import { Permission } from "./Permission";

@Index("PK__Roles_Pe__9091C0F30C77EB1F", ["roleId", "permissionId"], {
  unique: true,
})
@Entity("Roles_Permission", { schema: "dbo" })
export class RolesPermission {
  @Column("nvarchar", { primary: true, name: "Role_Id", length: 128 })
  roleId: string;

  @Column("int", { primary: true, name: "Permission_Id" })
  permissionId: number;

  @Column("bit", { name: "Value", default: () => "(0)" })
  value: boolean;

  @ManyToOne(() => AspNetRoles, (aspNetRoles) => aspNetRoles.rolesPermissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Role_Id", referencedColumnName: "id" }])
  role: AspNetRoles;

  @ManyToOne(() => Permission, (permission) => permission.rolesPermissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Permission_Id", referencedColumnName: "id" }])
  permission: Permission;
}
