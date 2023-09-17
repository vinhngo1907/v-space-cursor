import { UserAuthRepository } from '@datasource/postgresql';
import { UserAuthFromEntityDTO } from './dto/userAuth.response.dto';
import { UserAuth, UserAuthRepsone } from './interface/userAuth';
// import { UserAuthRepository } from '@datasource/postgresql';

export class UserAuthService {
    async createUserAuth(payload: UserAuth):Promise<UserAuthRepsone>{
        const userAuth = UserAuthRepository.create({...payload, status: 1});

        const userEntity = await UserAuthRepository.save(userAuth);

        delete userEntity.password;

        return UserAuthFromEntityDTO.toClass(userEntity);
    }
}