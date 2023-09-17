import { UserAuthEntity } from '@datasource/postgresql';
import { Mapper, Transform } from '@v-libs/node-infrastructure';

import { UserAuthRepsone } from '../interface/userAuth';

export class UserAuthFromEntityDTO extends Mapper<UserAuthEntity> implements UserAuthRepsone {
    fisrtName: string;
    id: string;
    lastName: string;
    email: string;
    phone?: string;
    status: string;
    name: string;

    @Transform(({ value }) => value.getTime())
    createdAt: number;

    @Transform(({ value }) => value.getTime())
    updatedAt: number;
}
