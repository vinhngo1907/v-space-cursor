import { createBaseRepository } from '@v-libs/node-infrastructure';

import { primaryDataSource } from '../datasource';
import { ExampleEntity } from '../entity/example';

export const ExampleRepository = primaryDataSource
  .getRepository(ExampleEntity)
  .extend({
    ...createBaseRepository<ExampleEntity>(),
    async findByName(name: string): Promise<ExampleEntity[]> {
      const example = await this.find({
        name,
      });

      return example;
    },
  });
