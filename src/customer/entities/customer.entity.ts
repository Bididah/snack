import { Column, Entity } from 'typeorm';
import { GenericUser } from 'util/generic-user';

@Entity()
export class Customer extends GenericUser {
  @Column()
  adresse: string;

  @Column()
  restaurantName: string;
}
