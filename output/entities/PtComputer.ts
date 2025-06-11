import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PtRoom } from "./PtRoom";
import { PtComputerProducts } from "./PtComputerProducts";
import { PtComputerTicket } from "./PtComputerTicket";

@Index("PK__PT_Compu__3214EC076C95D11E", ["id"], { unique: true })
@Entity("PT_Computer", { schema: "dbo" })
export class PtComputer {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("nvarchar", { name: "Code", nullable: true, length: 255 })
  code: string | null;

  @Column("nvarchar", { name: "Note", nullable: true, length: 1024 })
  note: string | null;

  @Column("nvarchar", { name: "Hardware", nullable: true, length: 2048 })
  hardware: string | null;

  @Column("datetime", { name: "Maintenance_Date", nullable: true })
  maintenanceDate: Date | null;

  @Column("nvarchar", {
    name: "Maintenance_Note",
    nullable: true,
    length: 2048,
  })
  maintenanceNote: string | null;

  @Column("int", { name: "Status", default: () => "(1)" })
  status: number;

  @Column("nvarchar", { name: "UserEmail", nullable: true, length: 255 })
  userEmail: string | null;

  @Column("nvarchar", { name: "UserName", nullable: true, length: 255 })
  userName: string | null;

  @Column("nvarchar", { name: "Tags", nullable: true, length: 255 })
  tags: string | null;

  @Column("nvarchar", { name: "Key", nullable: true, length: 50 })
  key: string | null;

  @ManyToOne(() => PtRoom, (ptRoom) => ptRoom.ptComputers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Room_Id", referencedColumnName: "id" }])
  room: PtRoom;

  @OneToMany(
    () => PtComputerProducts,
    (ptComputerProducts) => ptComputerProducts.idComputer2
  )
  ptComputerProducts: PtComputerProducts[];

  @OneToMany(
    () => PtComputerTicket,
    (ptComputerTicket) => ptComputerTicket.computer
  )
  ptComputerTickets: PtComputerTicket[];
}
