import { Controller, HttpController } from "@v-libs/node-infrastructure";
import { CreateExampleRequestBodySchema } from './dto/example.request.dto';
import { ExampleService } from "./example.service";
@Controller('/example')
export class ExampleController extends HttpController {
    exampleService: ExampleService
}