import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AppRegister } from "./AppRegister";
import { AppSerial } from "./AppSerial";

@Index("PK__App_Info__3214EC079DDAC2E0", ["id"], { unique: true })
@Entity("App_Info", { schema: "dbo" })
export class AppInfo {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "AppCode", nullable: true, length: 255 })
  appCode: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("bit", { name: "Trial_Reg", default: () => "(0)" })
  trialReg: boolean;

  @Column("int", { name: "Trial_LimitActiveDay", nullable: true })
  trialLimitActiveDay: number | null;

  @Column("int", { name: "Trial_UseDay", nullable: true })
  trialUseDay: number | null;

  @Column("nvarchar", { name: "Newest_Version", nullable: true, length: 50 })
  newestVersion: string | null;

  @Column("nvarchar", { name: "Download_Url", nullable: true, length: 255 })
  downloadUrl: string | null;

  @Column("nvarchar", { name: "SEO_Url", nullable: true, length: 255 })
  seoUrl: string | null;

  @OneToMany(() => AppRegister, (appRegister) => appRegister.appInfo)
  appRegisters: AppRegister[];

  @OneToMany(() => AppSerial, (appSerial) => appSerial.info)
  appSerials: AppSerial[];
}
