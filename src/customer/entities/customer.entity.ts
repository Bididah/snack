import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'util/base-entity';

@Entity()
export class Customer extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  adresse: string;

  @Column()
  restaurantName: string;

  @Column()
  phoneNumber: string;
}
