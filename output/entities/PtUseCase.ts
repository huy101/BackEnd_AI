import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PtCustomer } from "./PtCustomer";

@Index("PK__PT_UseCa__3214EC07A5937098", ["id"], { unique: true })
@Entity("PT_UseCase", { schema: "dbo" })
export class PtUseCase {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "Description", nullable: true })
  description: string | null;

  @Column("datetime", { name: "DateCreate", nullable: true })
  dateCreate: Date | null;

  @Column("nvarchar", { name: "UserCreate", nullable: true, length: 128 })
  userCreate: string | null;

  @Column("datetime", { name: "LastUpdate", nullable: true })
  lastUpdate: Date | null;

  @Column("nvarchar", { name: "Ticket_Products", nullable: true, length: 255 })
  ticketProducts: string | null;

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.ptUseCases, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Customer_Id", referencedColumnName: "id" }])
  customer: PtCustomer;
}
