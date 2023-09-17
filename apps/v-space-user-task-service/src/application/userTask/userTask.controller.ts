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
    async create(req: Request, response: Response): Promise<void> {
        const payload: UserTask = {
            ...req.body,
            customerId: req.headers['customer-id'],
        };

        const createUserTaskResult = await this.userTaskService.createUserTask(payload);
        if (createUserTaskResult) response.resSuccess(createUserTaskResult);
        else response.resError('fail');
    }

    @Route("post", "/:id")
    @HttpBodyValidate(UpdateUserTaskRequestBodySchema)
    async update(req:Request, response: Response): Promise<void>{
        const payload: UpdateUserTaskPayload = {
            ...req.body,
        };
        const updateUserTaskResult = await this.userTaskService.updateUserTask(payload, req.params.id);

        if(updateUserTaskResult) response.resSuccess(updateUserTaskResult)
        else response.resError('fail');
    }
}