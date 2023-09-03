import {
    primaryDataSource,
    UserTaskEntity,
    UserTaskRepository
} from "@datasource/postgresql";

import { UserTaskFromEntityDTO } from "./dto/userTask.response.dto";

import {
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

    async createUserTask(payload: UserTask):Promise<UserTaskServiceRes>{
        const {startTime, endTime}= payload;
        if(!this.validateUserTask({startTime, endTime})) return;
        
        const userTask = UserTaskRepository.create(payload);
        const userTaskEntity = await UserTaskRepository.save(userTask);

        return UserTaskFromEntityDTO.toClass(userTaskEntity);
    }
}