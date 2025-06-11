import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MenuItem } from "./MenuItem";

@Index("PK__Menu__3214EC07393312C5", ["id"], { unique: true })
@Index("UX_CodeLang", ["code", "lang"], { unique: true })
@Entity("Menu", { schema: "dbo" })
export class Menu {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @Column("varchar", { name: "Code", nullable: true, length: 50 })
  code: string | null;

  @Column("varchar", { name: "Lang", nullable: true, length: 2 })
  lang: string | null;

  @Column("bit", { name: "Field_1_Enable", default: () => "(0)" })
  field_1Enable: boolean;

  @Column("nvarchar", { name: "Field_1_Label", nullable: true, length: 100 })
  field_1Label: string | null;

  @Column("bit", { name: "Field_2_Enable", default: () => "(0)" })
  field_2Enable: boolean;

  @Column("nvarchar", { name: "Field_2_Label", nullable: true, length: 100 })
  field_2Label: string | null;

  @Column("bit", { name: "Field_3_Enable", default: () => "(0)" })
  field_3Enable: boolean;

  @Column("nvarchar", { name: "Field_3_Label", nullable: true, length: 100 })
  field_3Label: string | null;

  @Column("int", { name: "MaxLevel", nullable: true, default: () => "(0)" })
  maxLevel: number | null;

  @Column("bit", { name: "Field_4_Enable", default: () => "(0)" })
  field_4Enable: boolean;

  @Column("nvarchar", { name: "Field_4_Lable", nullable: true, length: 100 })
  field_4Lable: string | null;

  @Column("int", { name: "Field_5_Enable", default: () => "(0)" })
  field_5Enable: number;

  @Column("nvarchar", { name: "Field_5_Lable", nullable: true, length: 100 })
  field_5Lable: string | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.menu2)
  menuItems: MenuItem[];
}
