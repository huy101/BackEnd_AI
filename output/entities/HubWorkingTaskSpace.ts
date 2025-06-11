import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HubWorkingTask } from "./HubWorkingTask";
import { HubWorkingTaskColumn } from "./HubWorkingTaskColumn";

@Index("PK__HUB_Task__3214EC073784B0EE", ["id"], { unique: true })
@Entity("HUB_WorkingTaskSpace", { schema: "dbo" })
export class HubWorkingTaskSpace {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "Link", nullable: true, length: 255 })
  link: string | null;

  @Column("nvarchar", { name: "ColumnName", nullable: true, length: 2048 })
  columnName: string | null;

  @Column("bit", { name: "Active", default: () => "(1)" })
  active: boolean;

  @Column("nvarchar", { name: "FollowUsers", nullable: true })
  followUsers: string | null;

  @Column("bit", { name: "ViewFreedom", default: () => "(0)" })
  viewFreedom: boolean;

  @Column("bit", { name: "CanDelete", default: () => "(0)" })
  canDelete: boolean;

  @Column("nvarchar", { name: "UserViewAll", nullable: true })
  userViewAll: string | null;

  @OneToMany(() => HubWorkingTask, (hubWorkingTask) => hubWorkingTask.space)
  hubWorkingTasks: HubWorkingTask[];

  @OneToMany(
    () => HubWorkingTaskColumn,
    (hubWorkingTaskColumn) => hubWorkingTaskColumn.space
  )
  hubWorkingTaskColumns: HubWorkingTaskColumn[];
}
