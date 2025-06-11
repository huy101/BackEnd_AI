import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PtComputer } from "./PtComputer";

@Index("PK__PT_Compu__3214EC07702337D1", ["id"], { unique: true })
@Entity("PT_ComputerTicket", { schema: "dbo" })
export class PtComputerTicket {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Title", nullable: true, length: 255 })
  title: string | null;

  @Column("int", { name: "Type", nullable: true })
  type: number | null;

  @Column("int", { name: "Status", default: () => "(0)" })
  status: number;

  @Column("nvarchar", { name: "Request", nullable: true, length: 1024 })
  request: string | null;

  @Column("nvarchar", { name: "Feedback", nullable: true, length: 1024 })
  feedback: string | null;

  @ManyToOne(() => PtComputer, (ptComputer) => ptComputer.ptComputerTickets, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Computer_Id", referencedColumnName: "id" }])
  computer: PtComputer;
}
