import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";

@Index("PK__Country__3214EC0704D3B285", ["id"], { unique: true })
@Entity("Country", { schema: "dbo" })
export class Country {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("varchar", { name: "Link", nullable: true, length: 142 })
  link: string | null;

  @OneToMany(() => City, (city) => city.country)
  cities: City[];
}
