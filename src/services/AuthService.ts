// import { BX24 } from 'bx24';
import { authResponse } from '@/mocks/auth';

export class AuthService {
    public static auth(): Promise<unknown> {
        // const bx24 = new BX24();
        // return bx24.getAuth();

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(authResponse)
            }, 500);
        })
    }
}