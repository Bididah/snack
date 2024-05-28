import { Entity } from 'typeorm';
import { GenericUser } from 'util/generic-user';

@Entity()
export class User extends GenericUser {}
