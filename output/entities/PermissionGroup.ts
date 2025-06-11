import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Permission } from "./Permission";

@Index("PK__Permissi__3214EC07763CB63D", ["id"], { unique: true })
@Entity("Permission_Group", { schema: "dbo" })
export class PermissionGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Code", nullable: true, length: 50 })
  code: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("varchar", { name: "Plugin_Code", nullable: true, length: 50 })
  pluginCode: string | null;

  @OneToMany(() => Permission, (permission) => permission.group)
  permissions: Permission[];
}
