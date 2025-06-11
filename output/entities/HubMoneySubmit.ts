import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__HUB_Mone__3214EC074DA791E4", ["id"], { unique: true })
@Entity("HUB_MoneySubmit", { schema: "dbo" })
export class HubMoneySubmit {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 1024 })
  description: string | null;

  @Column("decimal", {
    name: "Amount",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  amount: number | null;

  @Column("int", { name: "VAT", nullable: true })
  vat: number | null;

  @Column("nvarchar", { name: "UserCreate", nullable: true, length: 128 })
  userCreate: string | null;

  @Column("nvarchar", { name: "UserApprove_Dept", nullable: true, length: 128 })
  userApproveDept: string | null;

  @Column("nvarchar", {
    name: "UserApprove_Final",
    nullable: true,
    length: 128,
  })
  userApproveFinal: string | null;

  @Column("int", { name: "Status", nullable: true })
  status: number | null;

  @Column("int", { name: "Project_Id", nullable: true })
  projectId: number | null;

  @Column("datetime", { name: "DateCreate", nullable: true })
  dateCreate: Date | null;

  @Column("nvarchar", { name: "Note_ToUser", nullable: true, length: 255 })
  noteToUser: string | null;

  @Column("nvarchar", {
    name: "Note_AccountantOnly",
    nullable: true,
    length: 255,
  })
  noteAccountantOnly: string | null;

  @Column("datetime", { name: "DateEdit", nullable: true })
  dateEdit: Date | null;

  @Column("int", { name: "Pay_Type", default: () => "(1)" })
  payType: number;
}
