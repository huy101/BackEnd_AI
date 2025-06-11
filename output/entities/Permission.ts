import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PermissionGroup } from "./PermissionGroup";
import { RolesPermission } from "./RolesPermission";
import { UserPermission } from "./UserPermission";

@Index("PK__Permissi__3214EC07CEF9F165", ["id"], { unique: true })
@Index("UX_Code", ["code"], { unique: true })
@Entity("Permission", { schema: "dbo" })
export class Permission {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Code", nullable: true, length: 25 })
  code: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("bit", { name: "PerRoles", default: () => "(0)" })
  perRoles: boolean;

  @Column("bit", { name: "PixelHide", default: () => "(0)" })
  pixelHide: boolean;

  @Column("bit", { name: "PerUser", default: () => "(0)" })
  perUser: boolean;

  @ManyToOne(
    () => PermissionGroup,
    (permissionGroup) => permissionGroup.permissions,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "Group_Id", referencedColumnName: "id" }])
  group: PermissionGroup;

  @OneToMany(
    () => RolesPermission,
    (rolesPermission) => rolesPermission.permission
  )
  rolesPermissions: RolesPermission[];

  @OneToMany(
    () => UserPermission,
    (userPermission) => userPermission.permission
  )
  userPermissions: UserPermission[];
}
