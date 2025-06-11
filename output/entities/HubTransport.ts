import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__HUB_Tran__3214EC077C02E084", ["id"], { unique: true })
@Entity("HUB_Transport", { schema: "dbo" })
export class HubTransport {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("nvarchar", { name: "Address", nullable: true, length: 255 })
  address: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("datetime", { name: "StartDate", nullable: true })
  startDate: Date | null;

  @Column("datetime", { name: "EndDate", nullable: true })
  endDate: Date | null;

  @Column("bit", { name: "Cancel", default: () => "(0)" })
  cancel: boolean;

  @Column("nvarchar", { name: "User_Id", nullable: true, length: 128 })
  userId: string | null;

  @Column("int", { name: "Type", nullable: true })
  type: number | null;
}
