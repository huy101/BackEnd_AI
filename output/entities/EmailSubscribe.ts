import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__EmailSub__3214EC07E4EBBC72", ["id"], { unique: true })
@Entity("EmailSubscribe", { schema: "dbo" })
export class EmailSubscribe {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("varchar", { name: "Email", nullable: true, length: 142 })
  email: string | null;

  @Column("datetime", { name: "Date", nullable: true })
  date: Date | null;

  @Column("bit", { name: "Active", default: () => "(1)" })
  active: boolean;

  @Column("int", { name: "Group_Id", nullable: true })
  groupId: number | null;

  @Column("bit", { name: "Hightlight", default: () => "(0)" })
  hightlight: boolean;

  @Column("nvarchar", { name: "Name", nullable: true, length: 255 })
  name: string | null;

  @Column("bit", { name: "Send", default: () => "(0)" })
  send: boolean;
}
