import { createBaseRepository } from '@v-libs/node-infrastructure';

import { primaryDataSource } from '../datasource';
import { UserTaskEntity } from '../entity/userTask';

export const UserTaskRepository = primaryDataSource
    .getRepository(UserTaskEntity)
    .extend({
        ...createBaseRepository<UserTaskEntity>(),
    });
