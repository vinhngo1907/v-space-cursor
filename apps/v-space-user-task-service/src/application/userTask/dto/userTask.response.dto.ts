import { UserTaskEntity } from '@datasource/postgresql';
import { Mapper } from '@v-libs/node-infrastructure';

import { UserTask } from '../interface/userTask';

export class UserTaskFromEntityDTO
  extends Mapper<UserTaskEntity>
  implements UserTask
{
  customerId: string;

  title: string;

  description: string;

  startTime: string;

  endTime: string;
}
