import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserCustomFieldValue } from "./UserCustomFieldValue";

@Index("PK__User_Cus__3214EC0729887CB6", ["id"], { unique: true })
@Entity("User_CustomField", { schema: "dbo" })
export class UserCustomField {
  @PrimaryGeneratedColumn({ type: "int", name: "Id" })
  id: number;

  @Column("int", { name: "Type", nullable: true })
  type: number | null;

  @Column("nvarchar", { name: "Code", nullable: true, length: 142 })
  code: string | null;

  @Column("nvarchar", { name: "Value_List", nullable: true, length: 2048 })
  valueList: string | null;

  @Column("nvarchar", { name: "Regex", nullable: true, length: 2048 })
  regex: string | null;

  @Column("bit", { name: "Require", default: () => "(0)" })
  require: boolean;

  @Column("nvarchar", { name: "Html", nullable: true, length: 1024 })
  html: string | null;

  @Column("int", { name: "Order", nullable: true })
  order: number | null;

  @Column("bit", { name: "Hide", default: () => "(0)" })
  hide: boolean;

  @Column("bit", { name: "Active", default: () => "(0)" })
  active: boolean;

  @OneToMany(
    () => UserCustomFieldValue,
    (userCustomFieldValue) => userCustomFieldValue.customField
  )
  userCustomFieldValues: UserCustomFieldValue[];
}
