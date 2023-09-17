import {
    Controller,
    HttpBodyValidate,
    HttpController,
    Request,
    Response,
    Route,
    Router,
} from '@v-libs/node-infrastructure';
import * as bcrypt from 'bcrypt';
import { UserAuth } from './interface/userAuth';
import { UserAuthService } from './userAuth.service';
import { SignUpRequestBodySchema } from './dto/userAuth.request.dto';

function generateHash(str: string, saltRounds: 10) {
    const hashStr = bcrypt.hashSync(str, saltRounds);
    return hashStr;
}

@Controller('/auth')
export class UserAuthController extends HttpController {
    userAuthService: UserAuthService;
    constructor(router: Router) {
        super(router);
        this.userAuthService = new UserAuthService();
    }
    @Route('post')
    @HttpBodyValidate(SignUpRequestBodySchema)
    async create(req: Request, response: Response): Promise<void> {
        const queriedUserAuth = await this.userAuthService.getByEmail(req.body.email);
        if (queriedUserAuth) {
            response.resError('Email already exists');
        }

        const password = generateHash(req.body.password, 10);
        const payload: UserAuth = { ...req.body, password };

        const userAuth = await this.userAuthService.createUserAuth(payload);

        userAuth ? response.resSuccess(userAuth) : response.resError('Signup failure');
    }
}