import { Column, Entity, Index } from "typeorm";

@Index("PK____Migrat__EE2FFF925D463F21", ["migrationId", "contextKey"], {
  unique: true,
})
@Entity("__MigrationHistory", { schema: "dbo" })
export class MigrationHistory {
  @Column("nvarchar", { primary: true, name: "MigrationId", length: 150 })
  migrationId: string;

  @Column("nvarchar", { primary: true, name: "ContextKey", length: 300 })
  contextKey: string;

  @Column("varbinary", { name: "Model" })
  model: Buffer;

  @Column("nvarchar", { name: "ProductVersion", length: 32 })
  productVersion: string;
}
