import { UserAuthRepository } from '@datasource/postgresql';
import { UserAuthFromEntityDTO } from './dto/userAuth.response.dto';
import { UserAuth, UserAuthRepsone } from './interface/userAuth';
// import { UserAuthRepository } from '@datasource/postgresql';

export class UserAuthService {
    async createUserAuth(payload: UserAuth):Promise<void>{

    }
}