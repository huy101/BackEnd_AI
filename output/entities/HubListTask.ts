import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { HubWorkingTask } from "./HubWorkingTask";
import { HubList } from "./HubList";

@Index("PK__Hub_List__CCCDCA01688CBD7F", ["idList", "idTask"], { unique: true })
@Entity("Hub_List_Task", { schema: "dbo" })
export class HubListTask {
  @Column("int", { primary: true, name: "Id_List" })
  idList: number;

  @Column("int", { primary: true, name: "Id_Task" })
  idTask: number;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("nvarchar", { name: "Note", nullable: true, length: 2048 })
  note: string | null;

  @Column("nvarchar", { name: "Step", nullable: true, length: 255 })
  step: string | null;

  @ManyToOne(
    () => HubWorkingTask,
    (hubWorkingTask) => hubWorkingTask.hubListTasks,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "Id_Task", referencedColumnName: "id" }])
  idTask2: HubWorkingTask;

  @ManyToOne(() => HubList, (hubList) => hubList.hubListTasks, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Id_List", referencedColumnName: "id" }])
  idList2: HubList;
}
