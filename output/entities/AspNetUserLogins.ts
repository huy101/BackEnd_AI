import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AspNetUsers } from "./AspNetUsers";

@Index("IX_UserId", ["userId"], {})
@Index(
  "PK__AspNetUs__663BD39E061E6CDC",
  ["loginProvider", "providerKey", "userId"],
  { unique: true }
)
@Entity("AspNetUserLogins", { schema: "dbo" })
export class AspNetUserLogins {
  @Column("nvarchar", { primary: true, name: "LoginProvider", length: 128 })
  loginProvider: string;

  @Column("nvarchar", { primary: true, name: "ProviderKey", length: 128 })
  providerKey: string;

  @Column("nvarchar", { primary: true, name: "UserId", length: 128 })
  userId: string;

  @ManyToOne(() => AspNetUsers, (aspNetUsers) => aspNetUsers.aspNetUserLogins, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "UserId", referencedColumnName: "id" }])
  user: AspNetUsers;
}
