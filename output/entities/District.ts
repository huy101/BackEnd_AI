import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";

@Index("PK__District__3214EC0760FB6D6F", ["id"], { unique: true })
@Entity("District", { schema: "dbo" })
export class District {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("varchar", { name: "Link", nullable: true, length: 142 })
  link: string | null;

  @ManyToOne(() => City, (city) => city.districts)
  @JoinColumn([{ name: "City_Id", referencedColumnName: "id" }])
  city: City;
}
