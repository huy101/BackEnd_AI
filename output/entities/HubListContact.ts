import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { HubContacts } from './HubContacts';
import { HubList } from './HubList';

@Index('PK__HUB_List__BDE0D78842F55292', ['idList', 'idContact'], {
  unique: true,
})
@Entity('HUB_List_Contact', { schema: 'dbo' })
export class HubListContact {
  @Column('int', { primary: true, name: 'Id_List' })
  idList: number;

  @Column('int', { primary: true, name: 'Id_Contact' })
  idContact: number;

  @Column('int', { name: 'Order', nullable: true })
  order: number | null;

  @Column('nvarchar', { name: 'Note', nullable: true, length: 2048 })
  note: string | null;

  @Column('datetime', { name: 'LastestEmail', nullable: true })
  lastestEmail: Date | null;

  @Column('datetime', { name: 'LastestUpdate', nullable: true })
  lastestUpdate: Date | null;

  @Column('nvarchar', { name: 'Step', nullable: true, length: 255 })
  step: string | null;

  @ManyToOne(() => HubContacts, (hubContacts) => hubContacts.hubListContacts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Id_Contact', referencedColumnName: 'id' }])
  idContact2: HubContacts;

  @ManyToOne(() => HubList, (hubList) => hubList.hubListContacts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'Id_List', referencedColumnName: 'id' }])
  idList2: HubList;
}
