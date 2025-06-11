import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Currency__3214EC0783079662", ["id"], { unique: true })
@Entity("Currency", { schema: "dbo" })
export class Currency {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("nvarchar", { name: "Symbol", nullable: true, length: 10 })
  symbol: string | null;

  @Column("varchar", { name: "Image", nullable: true, length: 142 })
  image: string | null;

  @Column("decimal", { name: "Rate", nullable: true, precision: 18, scale: 0 })
  rate: number | null;

  @Column("bit", { name: "Default", default: () => "(0)" })
  default: boolean;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;
}
