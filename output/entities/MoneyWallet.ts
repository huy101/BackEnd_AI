import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MoneyInOut } from "./MoneyInOut";

@Index("PK__Money_Wa__3214EC07DFA0779B", ["id"], { unique: true })
@Entity("Money_Wallet", { schema: "dbo" })
export class MoneyWallet {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @OneToMany(() => MoneyInOut, (moneyInOut) => moneyInOut.wallet)
  moneyInOuts: MoneyInOut[];

  @OneToMany(() => MoneyInOut, (moneyInOut) => moneyInOut.walletFrom)
  moneyInOuts2: MoneyInOut[];
}
