import { Column, Entity, Index, ManyToMany, OneToMany } from "typeorm";
import { AspNetUsers } from "./AspNetUsers";
import { RolesPermission } from "./RolesPermission";
import { RolesPostType } from "./RolesPostType";

@Index("PK__AspNetRo__3214EC0778657A49", ["id"], { unique: true })
@Index("RoleNameIndex", ["name"], { unique: true })
@Entity("AspNetRoles", { schema: "dbo" })
export class AspNetRoles {
  @Column("nvarchar", { primary: true, name: "Id", length: 128 })
  id: string;

  @Column("nvarchar", { name: "Name", length: 256 })
  name: string;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("bit", { name: "Default", default: () => "(0)" })
  default: boolean;

  @Column("nvarchar", { name: "Discriminator", length: 128 })
  discriminator: string;

  @ManyToMany(() => AspNetUsers, (aspNetUsers) => aspNetUsers.aspNetRoles)
  aspNetUsers: AspNetUsers[];

  @OneToMany(() => RolesPermission, (rolesPermission) => rolesPermission.role)
  rolesPermissions: RolesPermission[];

  @OneToMany(() => RolesPostType, (rolesPostType) => rolesPostType.role)
  rolesPostTypes: RolesPostType[];
}
