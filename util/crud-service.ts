/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  Repository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  DataSource,
} from 'typeorm';
import { BaseEntity } from './base-entity';
import { HistoricalChange } from 'src/historical-changes/entities/historical-change.entity';
import { generateUUID, groupByField } from './random-number';
import { log } from 'console';

@Injectable()
export class CrudService<T extends BaseEntity> {
  constructor(
    private readonly repository: Repository<T>,
    private readonly dataSource?: DataSource,
  ) {}

  async findAll(options?: FindManyOptions<T>): Promise<[T[], number]> {
    return this.repository.findAndCount(options);
  }

  async findOne(options?: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne(options);
    if (!entity) {
      throw new NotFoundException(`${this.getEntityName()} not found`);
    }
    const changes = await this.dataSource.getRepository(HistoricalChange).find({
      where: {
        entityName: this.getEntityName(),
        entityId: entity.id as number,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return Object.assign(entity, { changes: groupByField(changes, 'transID') });
  }

  async create(createDto: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(createDto);
    return this.repository.save(entity);
  }

  async update(
    updateDto: DeepPartial<T>,
    options?: FindOneOptions<T>,
  ): Promise<T> {
    let entity = await this.findOne(options); // Check if the entity exists
    const changes: HistoricalChange[] = [];
    const transID = generateUUID();

    for (const key in updateDto) {
      if (updateDto.hasOwnProperty(key)) {
        if (entity[key] !== updateDto[key]) {
          changes.push(
            this.dataSource.getRepository(HistoricalChange).create({
              entityId: entity.id as number,
              entityName: this.getEntityName(),
              oldValue: `${entity[key]}`,
              fieldName: key,
              newValue: `${updateDto[key]}`,
              transID,
              event: 'update',
            }),
          );
        }
      }
    }

    Object.assign(entity, updateDto);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      entity = await queryRunner.manager.save(entity);
      log('-------- 1');
      await queryRunner.manager.save(changes);
      log('-------- 2');
      await queryRunner.commitTransaction();
      return entity;
    } catch (err) {
      log(err);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async remove(options?: FindOneOptions<T>): Promise<void> {
    const entity = await this.findOne(options); // Check if the entity exists
    await this.repository.remove(entity);
  }

  private getEntityName(): string {
    return this.repository.metadata.targetName;
  }

  async uniqueFields(object: DeepPartial<T>): Promise<void> {
    const exEntity = await this.repository.findOne({
      where: object as any,
    });
    if (exEntity) throw new BadRequestException('field already exists');
  }
}
