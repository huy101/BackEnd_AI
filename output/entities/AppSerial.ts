import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AppActive } from "./AppActive";
import { AppInfo } from "./AppInfo";

@Index("PK__App_Seri__3214EC0749E2B127", ["id"], { unique: true })
@Entity("App_Serial", { schema: "dbo" })
export class AppSerial {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Serial", nullable: true, length: 128 })
  serial: string | null;

  @Column("int", { name: "Seat", default: () => "(0)" })
  seat: number;

  @Column("bit", { name: "Active", default: () => "(1)" })
  active: boolean;

  @Column("datetime", { name: "Date_Start", nullable: true })
  dateStart: Date | null;

  @Column("datetime", { name: "Date_End", nullable: true })
  dateEnd: Date | null;

  @Column("int", { name: "UseDay", nullable: true, default: () => "(0)" })
  useDay: number | null;

  @Column("int", { name: "Type", nullable: true })
  type: number | null;

  @Column("datetime", { name: "Date_First", nullable: true })
  dateFirst: Date | null;

  @OneToMany(() => AppActive, (appActive) => appActive.app)
  appActives: AppActive[];

  @ManyToOne(() => AppInfo, (appInfo) => appInfo.appSerials, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Info_Id", referencedColumnName: "id" }])
  info: AppInfo;
}
