import { Column } from 'typeorm';
import { BaseEntity } from './base-entity';

export class GenericUser extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, unique: true })
  phoneNumber: string;
}
