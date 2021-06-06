import { Service } from './Service';
import { AxiosResponse } from 'axios';
import { PaymentDay } from '@/logic/payment';

export class PaymentService extends Service {
    public static sendPayments(payments: Array<PaymentDay>): Promise<AxiosResponse<any>> {
        return new Promise((resolve) => {
            setTimeout(resolve, 500);
        })
    }
}