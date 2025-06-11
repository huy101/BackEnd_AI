import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HubWorkingTaskSpace } from "./HubWorkingTaskSpace";

@Index("PK__HUB_Work__3214EC07AEE98BE3", ["id"], { unique: true })
@Entity("HUB_WorkingTaskColumn", { schema: "dbo" })
export class HubWorkingTaskColumn {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("varchar", { name: "Bg_Color", nullable: true, length: 10 })
  bgColor: string | null;

  @Column("varchar", { name: "Text_Color", nullable: true, length: 10 })
  textColor: string | null;

  @ManyToOne(
    () => HubWorkingTaskSpace,
    (hubWorkingTaskSpace) => hubWorkingTaskSpace.hubWorkingTaskColumns,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "Space_Id", referencedColumnName: "id" }])
  space: HubWorkingTaskSpace;
}
