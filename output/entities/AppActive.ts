import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AppSerial } from "./AppSerial";

@Index("PK__App_Acti__3214EC0799BD8010", ["id"], { unique: true })
@Entity("App_Active", { schema: "dbo" })
export class AppActive {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Email", nullable: true, length: 255 })
  email: string | null;

  @Column("nvarchar", { name: "HWID", nullable: true, length: 128 })
  hwid: string | null;

  @Column("datetime", { name: "Date_First", nullable: true })
  dateFirst: Date | null;

  @Column("datetime", { name: "Date_Last", nullable: true })
  dateLast: Date | null;

  @Column("nvarchar", { name: "ComputerName", nullable: true, length: 255 })
  computerName: string | null;

  @Column("nvarchar", { name: "Token", nullable: true, length: 255 })
  token: string | null;

  @ManyToOne(() => AppSerial, (appSerial) => appSerial.appActives, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "App_Id", referencedColumnName: "id" }])
  app: AppSerial;
}
