import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Menu } from "./Menu";

@Index("IX_Menu", ["menu"], {})
@Index("IX_Owner", ["ownerId"], {})
@Index("PK__MenuItem__3214EC079503A554", ["id"], { unique: true })
@Entity("MenuItem", { schema: "dbo" })
export class MenuItem {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "Menu", nullable: true })
  menu: number | null;

  @Column("nvarchar", { name: "Name", nullable: true, length: 100 })
  name: string | null;

  @Column("int", { name: "Type", nullable: true })
  type: number | null;

  @Column("varchar", { name: "Url", nullable: true, length: 1024 })
  url: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("int", { name: "Level", nullable: true })
  level: number | null;

  @Column("int", { name: "Owner_Id", nullable: true })
  ownerId: number | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("nvarchar", { name: "Field_1", nullable: true, length: 142 })
  field_1: string | null;

  @Column("nvarchar", { name: "Field_2", nullable: true, length: 3000 })
  field_2: string | null;

  @Column("nvarchar", { name: "Field_3", nullable: true, length: 142 })
  field_3: string | null;

  @Column("nvarchar", { name: "Field_4", nullable: true, length: 142 })
  field_4: string | null;

  @Column("nvarchar", { name: "Field_5", nullable: true, length: 600 })
  field_5: string | null;

  @Column("int", { name: "Value_Id", nullable: true })
  valueId: number | null;

  @Column("bit", { name: "Nofollow", default: () => "(0)" })
  nofollow: boolean;

  @ManyToOne(() => Menu, (menu) => menu.menuItems)
  @JoinColumn([{ name: "Menu", referencedColumnName: "id" }])
  menu2: Menu;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.menuItems)
  @JoinColumn([{ name: "Owner_Id", referencedColumnName: "id" }])
  owner: MenuItem;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.owner)
  menuItems: MenuItem[];
}
