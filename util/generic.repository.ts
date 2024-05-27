// generic.repository.ts
import { DeepPartial, Repository } from 'typeorm';

export class GenericRepository<T> extends Repository<T> {
  createEntity(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.create(createDto);
    return this.save(entity);
  }

  findAllEntities(): Promise<T[]> {
    return this.find();
  }

  findOneEntity(id: number): Promise<T> {
    return this.findOne({});
  }

  updateEntity(id: number, updateDto: DeepPartial<T>): Promise<T> {
    return this.save({ id, ...updateDto });
  }

  removeEntity(id: number): Promise<T> {
    const entityToRemove = this.findOne({});
    return entityToRemove.then((entity) => {
      if (entity) {
        return this.remove(entity);
      }
      return null;
    });
  }
}
