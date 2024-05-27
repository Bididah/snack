import { BaseEntity } from 'util/base-entity';
import { Column, Entity, Index } from 'typeorm';

@Index(['entityName', 'entityId'], { unique: false })
@Entity()
export class HistoricalChange extends BaseEntity {
  @Column({ select: false })
  entityName: string;

  @Column({ select: false })
  entityId: number;

  @Column()
  fieldName: string;

  @Column()
  transID: string;

  @Column({ nullable: true })
  oldValue: string;

  @Column()
  newValue: string;

  @Column()
  event: string;
}
