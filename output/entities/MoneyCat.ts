import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MoneyInOut } from "./MoneyInOut";

@Index("PK__Money_Ca__3214EC0718D20F91", ["id"], { unique: true })
@Entity("Money_Cat", { schema: "dbo" })
export class MoneyCat {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @OneToMany(() => MoneyInOut, (moneyInOut) => moneyInOut.cat)
  moneyInOuts: MoneyInOut[];
}
