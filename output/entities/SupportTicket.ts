import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SupportPosts } from "./SupportPosts";

@Index("PK__Support___3214EC07071DFE61", ["id"], { unique: true })
@Entity("Support_Ticket", { schema: "dbo" })
export class SupportTicket {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("int", { name: "Customer_Id", nullable: true })
  customerId: number | null;

  @Column("int", { name: "Product_Id", nullable: true })
  productId: number | null;

  @Column("varchar", { name: "Code", nullable: true, length: 50 })
  code: string | null;

  @Column("datetime", { name: "Date_Create", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "Date_Start", nullable: true })
  dateStart: Date | null;

  @Column("datetime", { name: "Date_End", nullable: true })
  dateEnd: Date | null;

  @Column("int", { name: "Status_Id", nullable: true })
  statusId: number | null;

  @Column("int", { name: "Priority", nullable: true })
  priority: number | null;

  @Column("nvarchar", { name: "Customer_Email", nullable: true, length: 255 })
  customerEmail: string | null;

  @Column("nvarchar", { name: "Customer_Phone", nullable: true, length: 255 })
  customerPhone: string | null;

  @Column("nvarchar", { name: "Customer_Name", nullable: true, length: 255 })
  customerName: string | null;

  @Column("nvarchar", { name: "Keyworks", nullable: true, length: 2046 })
  keyworks: string | null;

  @Column("int", { name: "SiteId", nullable: true })
  siteId: number | null;

  @Column("nvarchar", { name: "EmailCC", nullable: true, length: 1024 })
  emailCc: string | null;

  @Column("nvarchar", { name: "EmailBCC", nullable: true, length: 1024 })
  emailBcc: string | null;

  @Column("nvarchar", { name: "User_Main", nullable: true, length: 1024 })
  userMain: string | null;

  @Column("nvarchar", { name: "Users_Follow", nullable: true, length: 1024 })
  usersFollow: string | null;

  @OneToMany(() => SupportPosts, (supportPosts) => supportPosts.ticket)
  supportPosts: SupportPosts[];
}
