import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Setting } from "./Setting";

@Index("PK__SettingG__3214EC070B4DB25C", ["id"], { unique: true })
@Entity("SettingGroup", { schema: "dbo" })
export class SettingGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @OneToMany(() => Setting, (setting) => setting.group)
  settings: Setting[];
}
