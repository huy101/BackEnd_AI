import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AspNetUsers } from "./AspNetUsers";

@Index("IX_UserId", ["userId"], {})
@Index("PK__AspNetUs__3214EC07974F1A51", ["id"], { unique: true })
@Entity("AspNetUserClaims", { schema: "dbo" })
export class AspNetUserClaims {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("nvarchar", { name: "UserId", length: 128 })
  userId: string;

  @Column("nvarchar", { name: "ClaimType", nullable: true })
  claimType: string | null;

  @Column("nvarchar", { name: "ClaimValue", nullable: true })
  claimValue: string | null;

  @ManyToOne(() => AspNetUsers, (aspNetUsers) => aspNetUsers.aspNetUserClaims, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: AspNetUsers;
}
