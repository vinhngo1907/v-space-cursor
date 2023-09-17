import { Controller, HttpBodyValidate, HttpController, Request, Response, ResponseUtils, Route, Router } from '@v-libs/node-infrastructure';
import {
    CreateUserTaskRequestBodySchema,
    UpdateUserTaskRequestBodySchema,
} from './dto/userTask.request.dto';
import { UpdateUserTaskPayload, UserTask } from './interface/userTask';
import { UserTaskService } from './userTask.service';

@Controller('/task')
export class UserTaskController extends HttpController {
    userTaskService: UserTaskService;
    constructor(router: Router) {
        super(router);
        this.userTaskService = new UserTaskService();
    }

    @Route('post')
    @HttpBodyValidate(CreateUserTaskRequestBodySchema)
    async create(req: Request, response: Response) {
        const payload: UserTask = {
            ...req.body,
            customerId: req.headers['customer-id'],
        };

        const createUserTaskResult = await this.userTaskService.createUserTask(payload);
        if (createUserTaskResult) response.resSuccess(createUserTaskResult);
        else response.resError('fail');
    }
}