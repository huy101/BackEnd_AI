import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AppInfo } from "./AppInfo";

@Index("PK__App_Regi__3214EC07539040AC", ["id"], { unique: true })
@Entity("App_Register", { schema: "dbo" })
export class AppRegister {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "Phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("int", { name: "Country_Id", nullable: true })
  countryId: number | null;

  @Column("nvarchar", { name: "Email", nullable: true, length: 255 })
  email: string | null;

  @Column("int", { name: "Occupation_Type", nullable: true })
  occupationType: number | null;

  @Column("nvarchar", { name: "Company", nullable: true, length: 255 })
  company: string | null;

  @Column("int", { name: "Position", nullable: true })
  position: number | null;

  @Column("int", { name: "Company_Size", nullable: true })
  companySize: number | null;

  @Column("nvarchar", { name: "Product_Version", nullable: true, length: 20 })
  productVersion: string | null;

  @Column("bit", { name: "Receive_Email", default: () => "(1)" })
  receiveEmail: boolean;

  @Column("int", { name: "Product_Exp", nullable: true })
  productExp: number | null;

  @Column("bit", { name: "Actived", default: () => "(0)" })
  actived: boolean;

  @Column("nvarchar", { name: "Token", nullable: true, length: 50 })
  token: string | null;

  @Column("nvarchar", { name: "Serial", nullable: true, length: 50 })
  serial: string | null;

  @ManyToOne(() => AppInfo, (appInfo) => appInfo.appRegisters, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "App_Info_Id", referencedColumnName: "id" }])
  appInfo: AppInfo;
}
