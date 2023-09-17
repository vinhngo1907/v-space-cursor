import {
    primaryDataSource,
    UserTaskEntity,
    UserTaskRepository
} from "@datasource/postgresql";

import { UserTaskFromEntityDTO } from "./dto/userTask.response.dto";

import {
    UpdateUserTaskPayload,
    UserTask,
    UserTaskServiceRes
} from "./interface/userTask";

export type UserTaskValidateField = {
    startTime: string;
    endTime: string;
};

export class UserTaskService {
    validateUserTask(data: UserTaskValidateField): boolean {
        const { startTime, endTime } = data;
        if (endTime && !(new Date(startTime) < new Date(endTime))) {
            return false;
        }

        return true;
    }

    async createUserTask(payload: UserTask): Promise<UserTaskServiceRes> {
        const { startTime, endTime } = payload;
        if (!this.validateUserTask({ startTime, endTime })) return;

        const userTask = UserTaskRepository.create(payload);
        const userTaskEntity = await UserTaskRepository.save(userTask);

        return UserTaskFromEntityDTO.toClass(userTaskEntity);
    }

    async updateUserTask(payload: UpdateUserTaskPayload, id: string): Promise<UserTaskServiceRes> {
        if (Object.keys(payload).length === 0) return;

        const { startTime, endTime } = payload;

        if (startTime && !this.validateUserTask({ startTime, endTime })) return;

        const queryRunner = primaryDataSource.createQueryRunner();
        await queryRunner.connect();

        await queryRunner.startTransaction();

        const userTaskResult = await queryRunner.manager.update(UserTaskEntity, id, payload);

        if (userTaskResult.affected === 0) return;

        const updatedEntity = await queryRunner.manager.findOneBy(UserTaskEntity, { id });
        if (
            !this.validateUserTask({
                startTime: updatedEntity.startTime,
                endTime: updatedEntity.endTime,
            })
        ) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            return;

        }
        await queryRunner.commitTransaction();
        await queryRunner.release();

        return UserTaskFromEntityDTO.toClass(updatedEntity);
    }
}