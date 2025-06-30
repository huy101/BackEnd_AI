import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { AspNetUserClaims } from './AspNetUserClaims';
import { AspNetUserLogins } from './AspNetUserLogins';
import { AspNetRoles } from './AspNetRoles';
import { UserCustomFieldValue } from './UserCustomFieldValue';
import { UserPermission } from './UserPermission';
import { UserPostType } from './UserPostType';

@Index('PK__AspNetUs__3214EC073D189304', ['id'], { unique: true })
@Index('UserNameIndex', ['userName'], { unique: true })
@Entity('AspNetUsers', { schema: 'dbo' })
export class AspNetUsers {
  @Column('nvarchar', { primary: true, name: 'Id', length: 128 })
  id: string;

  @Column('nvarchar', { name: 'Email', nullable: true, length: 256 })
  email: string | null;

  @Column('bit', { name: 'EmailConfirmed' })
  emailConfirmed: boolean;

  @Column('nvarchar', { name: 'PasswordHash', nullable: true })
  passwordHash: string | null;

  @Column('nvarchar', { name: 'SecurityStamp', nullable: true })
  securityStamp: string | null;

  @Column('nvarchar', { name: 'PhoneNumber', nullable: true })
  phoneNumber: string | null;

  @Column('bit', { name: 'PhoneNumberConfirmed' })
  phoneNumberConfirmed: boolean;

  @Column('bit', { name: 'TwoFactorEnabled' })
  twoFactorEnabled: boolean;

  @Column('datetime', { name: 'LockoutEndDateUtc', nullable: true })
  lockoutEndDateUtc: Date | null;

  @Column('bit', { name: 'LockoutEnabled' })
  lockoutEnabled: boolean;

  @Column('int', { name: 'AccessFailedCount' })
  accessFailedCount: number;

  @Column('nvarchar', { name: 'UserName', length: 256 })
  userName: string;

  @Column('nvarchar', { name: 'Name', nullable: true, length: 256 })
  name: string | null;

  @Column('nvarchar', { name: 'Company', nullable: true, length: 1024 })
  company: string | null;

  @Column('nvarchar', { name: 'Address', nullable: true, length: 1024 })
  address: string | null;

  @Column('int', { name: 'District_Id', nullable: true })
  districtId: number | null;

  @Column('datetime', { name: 'Birth', nullable: true })
  birth: Date | null;

  @Column('bit', { name: 'Banned', default: () => '(0)' })
  banned: boolean;

  @Column('nvarchar', { name: 'Avatar', nullable: true, length: 255 })
  avatar: string | null;

  @OneToMany(
    () => AspNetUserClaims,
    (aspNetUserClaims) => aspNetUserClaims.user,
  )
  aspNetUserClaims: AspNetUserClaims[];

  @OneToMany(
    () => AspNetUserLogins,
    (aspNetUserLogins) => aspNetUserLogins.user,
  )
  aspNetUserLogins: AspNetUserLogins[];

  @ManyToMany(() => AspNetRoles, (aspNetRoles) => aspNetRoles.aspNetUsers)
  @JoinTable({
    name: 'AspNetUserRoles',
    joinColumns: [{ name: 'UserId', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'RoleId', referencedColumnName: 'id' }],
    schema: 'dbo',
  })
  aspNetRoles: AspNetRoles[];

  @OneToMany(
    () => UserCustomFieldValue,
    (userCustomFieldValue) => userCustomFieldValue.user,
  )
  userCustomFieldValues: UserCustomFieldValue[];

  @OneToMany(() => UserPermission, (userPermission) => userPermission.user)
  userPermissions: UserPermission[];

  @OneToMany(() => UserPostType, (userPostType) => userPostType.user)
  userPostTypes: UserPostType[];
}
