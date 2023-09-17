import { BaseEntity } from "@v-libs/node-infrastructure";
import { Column, Entity } from "typeorm";

@Entity('userTask')
export class UserTaskEntity extends BaseEntity {
    @Column({ type: 'varchar', length: 48 })
    customeId: string;

    @Column({ type: 'varchar', length: 50 })
    title: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ type: 'timestamptz' })
    startTime: string;

    @Column({ type: 'timestamptz', nullable: true })
    endTime: string;
}