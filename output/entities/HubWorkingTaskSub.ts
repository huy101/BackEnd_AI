import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HubWorkingTask } from "./HubWorkingTask";

@Index("PK__HUB_Work__3214EC073FFC47D7", ["id"], { unique: true })
@Entity("HUB_WorkingTaskSub", { schema: "dbo" })
export class HubWorkingTaskSub {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Title", nullable: true, length: 142 })
  title: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 1024 })
  description: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("datetime", { name: "DueDate", nullable: true })
  dueDate: Date | null;

  @Column("bit", { name: "Done", default: () => "(0)" })
  done: boolean;

  @Column("nvarchar", { name: "Todo", nullable: true })
  todo: string | null;

  @Column("datetime", { name: "StartDate", nullable: true })
  startDate: Date | null;

  @Column("int", { name: "Status", nullable: true })
  status: number | null;

  @ManyToOne(
    () => HubWorkingTask,
    (hubWorkingTask) => hubWorkingTask.hubWorkingTaskSubs,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "Task_Id", referencedColumnName: "id" }])
  task: HubWorkingTask;
}
