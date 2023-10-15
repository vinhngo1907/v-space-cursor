import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { Column, Entity } from "typeorm";

@Entity('user')
export class UserAuthEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50 })
    firstName: string;

    @Column({ type: 'varchar', length: 50 })
    lastName: string;

    @Column({ type: 'text', })
    password: string;

    @Column({ unique: true, type: 'text', })
    email: string;

    @Column({ type: 'varchar', nullable: true, })
    phone: string;

    @Column({
        enum: [1, 2, 3],
    })
    status: 1 | 2 | 3;
}