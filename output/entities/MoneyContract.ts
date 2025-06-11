import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HubProject } from "./HubProject";

@Index("PK__Money_Co__3214EC0747DF48F0", ["id"], { unique: true })
@Entity("Money_Contract", { schema: "dbo" })
export class MoneyContract {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("nvarchar", { name: "Code", nullable: true, length: 142 })
  code: string | null;

  @Column("datetime", { name: "Date_Create", nullable: true })
  dateCreate: Date | null;

  @Column("datetime", { name: "Date_Sign", nullable: true })
  dateSign: Date | null;

  @Column("decimal", { name: "Total", nullable: true, precision: 18, scale: 0 })
  total: number | null;

  @Column("int", { name: "VAT", nullable: true })
  vat: number | null;

  @ManyToOne(() => HubProject, (hubProject) => hubProject.moneyContracts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Project_Id", referencedColumnName: "id" }])
  project: HubProject;
}
