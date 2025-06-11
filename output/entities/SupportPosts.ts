import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SupportTicket } from "./SupportTicket";

@Index("PK__Support___3214EC071FA34E70", ["id"], { unique: true })
@Entity("Support_Posts", { schema: "dbo" })
export class SupportPosts {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "Status_Id", nullable: true })
  statusId: number | null;

  @Column("nvarchar", { name: "User_Create", nullable: true, length: 1024 })
  userCreate: string | null;

  @Column("datetime", { name: "Date_Create", nullable: true })
  dateCreate: Date | null;

  @Column("nvarchar", { name: "Content", nullable: true })
  content: string | null;

  @Column("nvarchar", { name: "Attachment", nullable: true, length: 2048 })
  attachment: string | null;

  @ManyToOne(
    () => SupportTicket,
    (supportTicket) => supportTicket.supportPosts,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "Ticket_Id", referencedColumnName: "id" }])
  ticket: SupportTicket;
}
