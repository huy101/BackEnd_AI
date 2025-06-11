import { Column, Entity, Index } from "typeorm";

@Index("PK__Email_Ca__3214EC0772A6D9E5", ["id"], { unique: true })
@Entity("Email_Campaign", { schema: "dbo" })
export class EmailCampaign {
  @Column("int", { primary: true, name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("datetime", { name: "DateCreate", nullable: true })
  dateCreate: Date | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("nvarchar", { name: "Email_Title", nullable: true, length: 255 })
  emailTitle: string | null;

  @Column("nvarchar", { name: "Email_Content", nullable: true })
  emailContent: string | null;

  @Column("nvarchar", { name: "Contact_List", nullable: true })
  contactList: string | null;

  @Column("nvarchar", { name: "Contact_Sent", nullable: true })
  contactSent: string | null;

  @Column("nvarchar", { name: "Contact_Errors", nullable: true })
  contactErrors: string | null;

  @Column("datetime", { name: "Last_Sent", nullable: true })
  lastSent: Date | null;

  @Column("nvarchar", { name: "Code", nullable: true, length: 255 })
  code: string | null;
}
