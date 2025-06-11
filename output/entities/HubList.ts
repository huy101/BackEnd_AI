import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HubListContact } from "./HubListContact";
import { HubListCustomer } from "./HubListCustomer";
import { HubListTask } from "./HubListTask";
import { HubProject } from "./HubProject";

@Index("PK__HUB_List__3214EC0780C6EAA5", ["id"], { unique: true })
@Entity("HUB_List", { schema: "dbo" })
export class HubList {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("varchar", { name: "User_Ids", nullable: true })
  userIds: string | null;

  @Column("int", { name: "Type", default: () => "(1)" })
  type: number;

  @Column("datetime", { name: "DateCreate", nullable: true })
  dateCreate: Date | null;

  @Column("nvarchar", { name: "Email_Title", nullable: true, length: 1024 })
  emailTitle: string | null;

  @Column("nvarchar", { name: "Email_Content", nullable: true })
  emailContent: string | null;

  @Column("nvarchar", { name: "Email_CC", nullable: true, length: 1024 })
  emailCc: string | null;

  @Column("nvarchar", { name: "Email_BCC", nullable: true, length: 1024 })
  emailBcc: string | null;

  @Column("nvarchar", { name: "UserCreate", nullable: true, length: 128 })
  userCreate: string | null;

  @Column("nvarchar", { name: "StepList", nullable: true, length: 2048 })
  stepList: string | null;

  @OneToMany(() => HubListContact, (hubListContact) => hubListContact.idList2)
  hubListContacts: HubListContact[];

  @OneToMany(
    () => HubListCustomer,
    (hubListCustomer) => hubListCustomer.idList2
  )
  hubListCustomers: HubListCustomer[];

  @OneToMany(() => HubListTask, (hubListTask) => hubListTask.idList2)
  hubListTasks: HubListTask[];

  @OneToMany(() => HubProject, (hubProject) => hubProject.list)
  hubProjects: HubProject[];
}
