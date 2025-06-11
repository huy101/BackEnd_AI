import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__HUB_User__3214EC076EEF0C7A", ["id"], { unique: true })
@Entity("HUB_UserCalendarManage", { schema: "dbo" })
export class HubUserCalendarManage {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "Type", nullable: true })
  type: number | null;

  @Column("nvarchar", { name: "ManagerId", nullable: true, length: 128 })
  managerId: string | null;

  @Column("nvarchar", { name: "UserId", nullable: true, length: 128 })
  userId: string | null;

  @Column("bit", { name: "Approved", default: () => "(0)" })
  approved: boolean;

  @Column("bit", { name: "Follow" })
  follow: boolean;

  @Column("bit", { name: "Notification", default: () => "(0)" })
  notification: boolean;
}
