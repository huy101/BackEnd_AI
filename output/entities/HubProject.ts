import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HubActivities } from "./HubActivities";
import { HubFile } from "./HubFile";
import { HubLogs } from "./HubLogs";
import { PtCustomer } from "./PtCustomer";
import { HubList } from "./HubList";
import { HubProjectCat } from "./HubProjectCat";
import { HubServices } from "./HubServices";
import { HubProjectProcess } from "./HubProjectProcess";
import { HubWorkingTask } from "./HubWorkingTask";
import { MoneyContract } from "./MoneyContract";
import { MoneyInOut } from "./MoneyInOut";

@Index("PK__Contract__3214EC07440B1D61", ["id"], { unique: true })
@Entity("HUB_Project", { schema: "dbo" })
export class HubProject {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("nvarchar", { name: "Code", nullable: true, length: 142 })
  code: string | null;

  @Column("datetime", { name: "Date_Create", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "Date_Sign", nullable: true })
  dateSign: Date | null;

  @Column("decimal", { name: "Total", nullable: true, precision: 18, scale: 0 })
  total: number | null;

  @Column("nvarchar", { name: "Note", nullable: true, length: 2048 })
  note: string | null;

  @Column("bit", { name: "Archive", default: () => "(0)" })
  archive: boolean;

  @Column("nvarchar", { name: "AssignedUser", nullable: true, length: 1024 })
  assignedUser: string | null;

  @Column("nvarchar", { name: "FollowUsers", nullable: true })
  followUsers: string | null;

  @Column("int", { name: "Percent", default: () => "(0)" })
  percent: number;

  @Column("bit", { name: "FollowUserOnly", default: () => "(0)" })
  followUserOnly: boolean;

  @Column("nvarchar", { name: "Ticket_Email", nullable: true, length: 1024 })
  ticketEmail: string | null;

  @Column("nvarchar", { name: "Ticket_CC", nullable: true, length: 1024 })
  ticketCc: string | null;

  @Column("nvarchar", { name: "Ticket_BCC", nullable: true, length: 1024 })
  ticketBcc: string | null;

  @Column("datetime", { name: "Ticket_Email_Date", nullable: true })
  ticketEmailDate: Date | null;

  @Column("int", { name: "Duration", nullable: true })
  duration: number | null;

  @Column("nvarchar", { name: "Tags", nullable: true, length: 2048 })
  tags: string | null;

  @Column("int", { name: "Status_Id", nullable: true })
  statusId: number | null;

  @Column("decimal", {
    name: "Amount",
    nullable: true,
    precision: 18,
    scale: 2,
  })
  amount: number | null;

  @Column("int", { name: "CRM_Quotation_Id", nullable: true })
  crmQuotationId: number | null;

  @Column("int", { name: "Type", nullable: true })
  type: number | null;

  @Column("nvarchar", { name: "User_Id", nullable: true, length: 128 })
  userId: string | null;

  @Column("nvarchar", { name: "Content", nullable: true })
  content: string | null;

  @Column("nvarchar", { name: "Ticket_Name", nullable: true, length: 255 })
  ticketName: string | null;

  @Column("nvarchar", { name: "Ticket_Products", nullable: true, length: 255 })
  ticketProducts: string | null;

  @Column("datetime", { name: "LastUpdate", nullable: true })
  lastUpdate: Date | null;

  @Column("nvarchar", { name: "Ticket_Phone", nullable: true, length: 50 })
  ticketPhone: string | null;

  @Column("nvarchar", { name: "Ticket_Error", nullable: true, length: 1024 })
  ticketError: string | null;

  @Column("nvarchar", { name: "Ticket_Solution", nullable: true, length: 2048 })
  ticketSolution: string | null;

  @Column("int", {
    name: "Ticket_Duration_2",
    nullable: true,
    default: () => "(0)",
  })
  ticketDuration_2: number | null;

  @Column("int", {
    name: "Ticket_Duration_3",
    nullable: true,
    default: () => "(0)",
  })
  ticketDuration_3: number | null;

  @Column("bit", { name: "Ticket_NoMail", default: () => "(0)" })
  ticketNoMail: boolean;

  @Column("nvarchar", { name: "ThinkMap", nullable: true })
  thinkMap: string | null;

  @Column("int", { name: "Health_Result", nullable: true })
  healthResult: number | null;

  @Column("nvarchar", { name: "Health_Deatil", nullable: true })
  healthDeatil: string | null;

  @Column("int", { name: "Priority", default: () => "(1)" })
  priority: number;

  @Column("nvarchar", { name: "ChatLink", nullable: true, length: 2048 })
  chatLink: string | null;

  @Column("nvarchar", {
    name: "FinancialPlanning",
    nullable: true,
    length: 2048,
  })
  financialPlanning: string | null;

  @Column("nvarchar", { name: "ManagementUser", nullable: true, length: 2048 })
  managementUser: string | null;

  @OneToMany(() => HubActivities, (hubActivities) => hubActivities.project)
  hubActivities: HubActivities[];

  @OneToMany(() => HubFile, (hubFile) => hubFile.project)
  hubFiles: HubFile[];

  @OneToMany(() => HubLogs, (hubLogs) => hubLogs.project)
  hubLogs: HubLogs[];

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.hubProjects)
  @JoinColumn([{ name: "Customer_Id", referencedColumnName: "id" }])
  customer: PtCustomer;

  @ManyToOne(() => HubProject, (hubProject) => hubProject.hubProjects)
  @JoinColumn([{ name: "Owner_Project", referencedColumnName: "id" }])
  ownerProject: HubProject;

  @OneToMany(() => HubProject, (hubProject) => hubProject.ownerProject)
  hubProjects: HubProject[];

  @ManyToOne(() => HubList, (hubList) => hubList.hubProjects, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "List_Id", referencedColumnName: "id" }])
  list: HubList;

  @ManyToOne(() => HubProjectCat, (hubProjectCat) => hubProjectCat.hubProjects)
  @JoinColumn([{ name: "Cat_Id", referencedColumnName: "id" }])
  cat: HubProjectCat;

  @ManyToOne(() => HubServices, (hubServices) => hubServices.hubProjects)
  @JoinColumn([{ name: "Service_Id", referencedColumnName: "id" }])
  service: HubServices;

  @OneToMany(
    () => HubProjectProcess,
    (hubProjectProcess) => hubProjectProcess.project
  )
  hubProjectProcesses: HubProjectProcess[];

  @OneToMany(() => HubWorkingTask, (hubWorkingTask) => hubWorkingTask.project)
  hubWorkingTasks: HubWorkingTask[];

  @OneToMany(() => MoneyContract, (moneyContract) => moneyContract.project)
  moneyContracts: MoneyContract[];

  @OneToMany(() => MoneyInOut, (moneyInOut) => moneyInOut.project)
  moneyInOuts: MoneyInOut[];
}
