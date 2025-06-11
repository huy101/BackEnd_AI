import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HubProject } from "./HubProject";
import { MoneyCat } from "./MoneyCat";
import { MoneyWallet } from "./MoneyWallet";

@Index("PK__Money_In__3214EC07AF7645E6", ["id"], { unique: true })
@Entity("Money_InOut", { schema: "dbo" })
export class MoneyInOut {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("int", { name: "Type", nullable: true, default: () => "(1)" })
  type: number | null;

  @Column("datetime", { name: "Date_Create", nullable: true })
  dateCreate: Date | null;

  @Column("decimal", {
    name: "Amount",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  amount: number | null;

  @Column("int", { name: "VAT", nullable: true })
  vat: number | null;

  @Column("decimal", {
    name: "AmountWithVAT",
    nullable: true,
    precision: 18,
    scale: 0,
  })
  amountWithVat: number | null;

  @Column("nvarchar", { name: "Note", nullable: true, length: 2048 })
  note: string | null;

  @Column("nvarchar", { name: "User_Add", nullable: true, length: 128 })
  userAdd: string | null;

  @Column("int", { name: "Status", nullable: true, default: () => "(1)" })
  status: number | null;

  @Column("nvarchar", { name: "Tags", nullable: true, length: 255 })
  tags: string | null;

  @Column("bit", { name: "SubmitSystem", default: () => "(0)" })
  submitSystem: boolean;

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

  @Column("nvarchar", { name: "Note_ToUser", nullable: true, length: 1024 })
  noteToUser: string | null;

  @Column("nvarchar", {
    name: "Note_Accountant_Only",
    nullable: true,
    length: 1024,
  })
  noteAccountantOnly: string | null;

  @Column("bit", {
    name: "Accountant_Checked",
    nullable: true,
    default: () => "(0)",
  })
  accountantChecked: boolean | null;

  @Column("nvarchar", { name: "VAT_Note", nullable: true, length: 255 })
  vatNote: string | null;

  @Column("int", { name: "Pay_Type", nullable: true })
  payType: number | null;

  @ManyToOne(() => HubProject, (hubProject) => hubProject.moneyInOuts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Project_Id", referencedColumnName: "id" }])
  project: HubProject;

  @ManyToOne(() => MoneyCat, (moneyCat) => moneyCat.moneyInOuts, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "Cat_Id", referencedColumnName: "id" }])
  cat: MoneyCat;

  @ManyToOne(() => MoneyWallet, (moneyWallet) => moneyWallet.moneyInOuts, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "Wallet_Id", referencedColumnName: "id" }])
  wallet: MoneyWallet;

  @ManyToOne(() => MoneyWallet, (moneyWallet) => moneyWallet.moneyInOuts2)
  @JoinColumn([{ name: "WalletFrom_Id", referencedColumnName: "id" }])
  walletFrom: MoneyWallet;
}
