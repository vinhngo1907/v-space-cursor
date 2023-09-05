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

@Controller('/auth')
export class UserAuthController extends HttpController {
    userAuthService: UserAuthService;
    constructor(router: Router) {
        super(router);
        this.userAuthService = new UserAuthService();
    }
}