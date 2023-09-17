import { ExampleEntity } from '@datasource/postgresql';
import { Mapper, Transform } from '@v-libs/node-infrastructure';
import { Example } from '../interface/example';

export class ExampleFromEntityDTO extends Mapper<ExampleEntity> implements Example {
    name: string;

    @Transform(({ value }) => value.getTime())
    createdAt: number;

    @Transform(({ value }) => value.getTime())
    updatedAt: number;
}