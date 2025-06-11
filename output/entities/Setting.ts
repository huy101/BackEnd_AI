import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SettingGroup } from "./SettingGroup";

@Index("PK__Setting__3214EC07B3A66496", ["id"], { unique: true })
@Index("UX_CodeLang", ["code", "lang"], { unique: true })
@Entity("Setting", { schema: "dbo" })
export class Setting {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("nvarchar", { name: "Value", nullable: true })
  value: string | null;

  @Column("int", { name: "Edit_Type", nullable: true })
  editType: number | null;

  @Column("varchar", { name: "Code", nullable: true, length: 35 })
  code: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("bit", { name: "Public", default: () => "(1)" })
  public: boolean;

  @Column("bit", { name: "UseActive", default: () => "(0)" })
  useActive: boolean;

  @Column("int", { name: "Type", nullable: true, default: () => "(1)" })
  type: number | null;

  @Column("bit", { name: "UseLang", default: () => "(0)" })
  useLang: boolean;

  @Column("varchar", { name: "Lang", nullable: true, length: 2 })
  lang: string | null;

  @ManyToOne(() => SettingGroup, (settingGroup) => settingGroup.settings)
  @JoinColumn([{ name: "Group", referencedColumnName: "id" }])
  group: SettingGroup;
}
