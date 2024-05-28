import { Column } from 'typeorm';
import { BaseEntity } from './base-entity';

export class GenericUser extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;
}
