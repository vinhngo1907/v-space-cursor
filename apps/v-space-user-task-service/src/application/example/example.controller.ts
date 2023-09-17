import { Controller } from "@v-libs/node-infrastructure";
import { CreateExampleRequestBodySchema } from './dto/example.request.dto';
@Controller('/example')
export class ExampleController extends HttpController {
    exampleService: ExampleService
}