import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PtComputer } from "./PtComputer";
import { PtCustomer } from "./PtCustomer";

@Index("PK__PT_Room__3214EC0762BEDE8E", ["id"], { unique: true })
@Entity("PT_Room", { schema: "dbo" })
export class PtRoom {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "Note", nullable: true, length: 1024 })
  note: string | null;

  @OneToMany(() => PtComputer, (ptComputer) => ptComputer.room)
  ptComputers: PtComputer[];

  @ManyToOne(() => PtCustomer, (ptCustomer) => ptCustomer.ptRooms, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Customer_Id", referencedColumnName: "id" }])
  customer: PtCustomer;
}
