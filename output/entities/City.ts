import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './Country';
import { District } from './District';

@Index('PK__City__3214EC0778325B70', ['id'], { unique: true })
@Entity('City', { schema: 'dbo' })
export class City {
  @PrimaryGeneratedColumn({ type: 'int', name: 'Id' })
  id: number;

  @Column('nvarchar', { name: 'Name', nullable: true, length: 142 })
  name: string | null;

  @Column('varchar', { name: 'Link', nullable: true, length: 142 })
  link: string | null;

  @ManyToOne(() => Country, (country) => country.cities)
  @JoinColumn([{ name: 'Country_Id', referencedColumnName: 'id' }])
  country: Country;

  @OneToMany(() => District, (district) => district.city)
  districts: District[];
}
