export type UserTask = {
    customerId: string;
    title: string;
    description?: string;
    startTime: string;
    endTime?: string;
}

export type UserTaskServiceRes = UserTask;

export type UpdateUserTaskPayload = {
    title?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
};