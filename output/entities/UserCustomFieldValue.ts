import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { AspNetUsers } from "./AspNetUsers";
import { UserCustomField } from "./UserCustomField";

@Index("PK__User_Cus__6DC407D197C69419", ["userId", "customFieldId"], {
  unique: true,
})
@Entity("User_CustomField_Value", { schema: "dbo" })
export class UserCustomFieldValue {
  @Column("nvarchar", { primary: true, name: "User_Id", length: 128 })
  userId: string;

  @Column("int", { primary: true, name: "CustomField_Id" })
  customFieldId: number;

  @Column("nvarchar", { name: "Value", nullable: true, length: 2048 })
  value: string | null;

  @Column("bit", { name: "Value_Bit", default: () => "(0)" })
  valueBit: boolean;

  @ManyToOne(
    () => AspNetUsers,
    (aspNetUsers) => aspNetUsers.userCustomFieldValues,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "User_Id", referencedColumnName: "id" }])
  user: AspNetUsers;

  @ManyToOne(
    () => UserCustomField,
    (userCustomField) => userCustomField.userCustomFieldValues,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "CustomField_Id", referencedColumnName: "id" }])
  customField: UserCustomField;
}
