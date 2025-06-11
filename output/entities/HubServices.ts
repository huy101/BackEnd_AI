import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HubProject } from "./HubProject";

@Index("PK__Services__3214EC07693CA210", ["id"], { unique: true })
@Entity("HUB_Services", { schema: "dbo" })
export class HubServices {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Name", nullable: true, length: 142 })
  name: string | null;

  @Column("int", { name: "Level", nullable: true })
  level: number | null;

  @Column("nvarchar", { name: "Title", nullable: true, length: 142 })
  title: string | null;

  @Column("nvarchar", { name: "Description", nullable: true, length: 2048 })
  description: string | null;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @Column("bit", { name: "Hide", default: () => "(0)" })
  hide: boolean;

  @Column("nvarchar", { name: "Code", nullable: true, length: 142 })
  code: string | null;

  @OneToMany(() => HubProject, (hubProject) => hubProject.service)
  hubProjects: HubProject[];

  @ManyToOne(() => HubServices, (hubServices) => hubServices.hubServices)
  @JoinColumn([{ name: "Owner_Service", referencedColumnName: "id" }])
  ownerService: HubServices;

  @OneToMany(() => HubServices, (hubServices) => hubServices.ownerService)
  hubServices: HubServices[];
}
