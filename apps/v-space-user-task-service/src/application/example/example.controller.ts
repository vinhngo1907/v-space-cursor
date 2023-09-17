import {
    Controller, HttpBodyValidate, HttpController, Request,
    Response,
    Route,
    Router,
} from "@v-libs/node-infrastructure";
import { CreateExampleRequestBodySchema } from './dto/example.request.dto';
import { ExampleService } from "./example.service";

@Controller('/example')
export class ExampleController extends HttpController {
    exampleService: ExampleService;

    constructor(router: Router) {
        super(router);
        this.exampleService = new ExampleService();
    }

    @Route('post')
    @HttpBodyValidate(CreateExampleRequestBodySchema)
    async create(req: Request, response: Response) {
        const { name }: CreateExampleRequestBodySchema = req.body;
        const example = await this.exampleService.createExample({ name });

        response.resSuccess(example);
    }
}