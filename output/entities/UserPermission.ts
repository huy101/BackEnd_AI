import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AspNetUsers } from "./AspNetUsers";
import { Permission } from "./Permission";

@Index("PK__User_Per__68F6E538DB6E8477", ["userId", "permissionId"], {
  unique: true,
})
@Entity("User_Permission", { schema: "dbo" })
export class UserPermission {
  @Column("nvarchar", { primary: true, name: "User_Id", length: 128 })
  userId: string;

  @Column("int", { primary: true, name: "Permission_Id" })
  permissionId: number;

  @Column("bit", { name: "Value", default: () => "(0)" })
  value: boolean;

  @ManyToOne(() => AspNetUsers, (aspNetUsers) => aspNetUsers.userPermissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "User_Id", referencedColumnName: "id" }])
  user: AspNetUsers;

  @ManyToOne(() => Permission, (permission) => permission.userPermissions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Permission_Id", referencedColumnName: "id" }])
  permission: Permission;
}
