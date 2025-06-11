import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { HubProject } from "./HubProject";
import { HubActivities } from "./HubActivities";

@Index("PK__HUB_File__3214EC07895D334D", ["id"], { unique: true })
@Entity("HUB_File", { schema: "dbo" })
export class HubFile {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "FileName", nullable: true, length: 255 })
  fileName: string | null;

  @Column("nvarchar", { name: "Slug", nullable: true, length: 255 })
  slug: string | null;

  @Column("varchar", { name: "Ext", nullable: true, length: 10 })
  ext: string | null;

  @Column("nvarchar", { name: "Thumbnail", nullable: true, length: 255 })
  thumbnail: string | null;

  @Column("int", { name: "Task_Id", nullable: true })
  taskId: number | null;

  @Column("int", { name: "Content_Id", nullable: true })
  contentId: number | null;

  @Column("nvarchar", { name: "Content_Type", nullable: true, length: 10 })
  contentType: string | null;

  @ManyToOne(() => HubProject, (hubProject) => hubProject.hubFiles, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "Project_Id", referencedColumnName: "id" }])
  project: HubProject;

  @ManyToOne(() => HubActivities, (hubActivities) => hubActivities.hubFiles, {
    onDelete: "SET NULL",
    onUpdate: "SET NULL",
  })
  @JoinColumn([{ name: "Activity_Id", referencedColumnName: "id" }])
  activity: HubActivities;
}
