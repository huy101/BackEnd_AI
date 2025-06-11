import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Counter__3214EC278ACCE63A", ["id"], { unique: true })
@Entity("Counter", { schema: "dbo" })
export class Counter {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("datetime", { name: "Ngay" })
  ngay: Date;

  @Column("int", { name: "SoLuongTryCap" })
  soLuongTryCap: number;

  @Column("datetime", { name: "LanTruyCapGanNhat" })
  lanTruyCapGanNhat: Date;
}
