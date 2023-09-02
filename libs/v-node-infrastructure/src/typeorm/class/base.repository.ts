import { BaseEntity, DataSource, EntityTarget, In, Repository } from 'typeorm';

export class BaseRepositoryClass<T> extends Repository<T> {
    async findById(id: string): Promise<T | undefined> {
        const results = await this.findByIds([id]);

        return results?.[0];
    }
}

interface BaseRepository<Entity> {
    findById: (id: string | number) => Promise<Entity | undefined>;
}

export type BaseRepositoryWithThis<Entity> = BaseRepository<Entity> &
    ThisType<Repository<Entity> & BaseRepository<Entity>>;

export const createBaseRepository = <
    Entity extends BaseEntity
>(): BaseRepository<Entity> => ({
    async findById(id) {
        const result = await (this as unknown as Repository<any>).findOne({
            where: {
                id,
            },
        });

        return result;
    },
});