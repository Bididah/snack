import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'util/base-entity';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'float' })
  prix: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  remise: number;
}
