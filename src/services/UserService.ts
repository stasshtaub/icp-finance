import { Service } from './Service';
import { userResponse } from '@/mocks/user';
import { AxiosResponse } from 'axios';
import { User } from '@/store/types/user';

export class UserService extends Service {
    public static getUser(): Promise<AxiosResponse<User>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: userResponse } as AxiosResponse<User>)
            }, 500);
        })
    }
}