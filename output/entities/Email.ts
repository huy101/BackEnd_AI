import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("PK__Email__3214EC07E60C7255", ["id"], { unique: true })
@Entity("Email", { schema: "dbo" })
export class Email {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "Username", nullable: true, length: 142 })
  username: string | null;

  @Column("varchar", { name: "Email", nullable: true, length: 100 })
  email: string | null;

  @Column("nvarchar", { name: "Subject", nullable: true, length: 142 })
  subject: string | null;

  @Column("ntext", { name: "Text", nullable: true })
  text: string | null;

  @Column("bit", { name: "Read", default: () => "(0)" })
  read: boolean;

  @Column("datetime", { name: "DateSend", nullable: true })
  dateSend: Date | null;

  @Column("varchar", { name: "Phone", nullable: true, length: 50 })
  phone: string | null;

  @Column("nvarchar", { name: "Address", nullable: true, length: 142 })
  address: string | null;

  @Column("nvarchar", { name: "Prefix", nullable: true, length: 142 })
  prefix: string | null;
}
