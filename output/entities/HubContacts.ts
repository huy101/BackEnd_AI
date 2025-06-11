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
import { PtCustomer } from "./PtCustomer";
import { HubListContact } from "./HubListContact";

@Index("PK__HUB_Cont__3214EC076A394026", ["id"], { unique: true })
@Entity("HUB_Contacts", { schema: "dbo" })
export class HubContacts {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "Phone", nullable: true, length: 255 })
  phone: string | null;

  @Column("nvarchar", { name: "Email", nullable: true, length: 128 })
  email: string | null;

  @Column("nvarchar", { name: "Email2", nullable: true, length: 128 })
  email2: string | null;

  @Column("nvarchar", { name: "Note", nullable: true, length: 2048 })
  note: string | null;

  @Column("nvarchar", { name: "FollowUsers", nullable: true, length: 2048 })
  followUsers: string | null;

  @Column("nvarchar", { name: "User_Id", nullable: true, length: 128 })
  userId: string | null;

  @Column("bit", { name: "FollowUserOnly", default: () => "(0)" })
  followUserOnly: boolean;

  @Column("datetime", { name: "DateCreate", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "DateUpdate", nullable: true })
  dateUpdate: Date | null;

  @Column("int", { name: "Source", nullable: true })
  source: number | null;

  @Column("nvarchar", { name: "Position", nullable: true, length: 255 })
  position: string | null;

  @Column("bit", { name: "CRMShow", default: () => "(0)" })
  crmShow: boolean;

  @Column("datetime", { name: "Anniversary_Date", nullable: true })
  anniversaryDate: Date | null;

  @OneToMany(() => HubActivities, (hubActivities) => hubActivities.contact)
  hubActivities: HubActivities[];

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.hubContacts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Customer_Id", referencedColumnName: "id" }])
  customer: PtCustomer;

  @OneToMany(
    () => HubListContact,
    (hubListContact) => hubListContact.idContact2
  )
  hubListContacts: HubListContact[];
}
