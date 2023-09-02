import { BaseEntity } from "@v-libs/node-infrastructure";
import { Column, Entity } from "typeorm";

@Entity('example')
export class ExampleEntity extends BaseEntity {
    @Column({
        type: "varchar",
        length: 50
    })
    name: string;
}