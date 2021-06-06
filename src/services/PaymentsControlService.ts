import { Service } from './Service';
import { paymentsResponse } from '@/mocks/payments';
import { AxiosResponse } from 'axios';
import { PaymentsControlResponse } from '@/store/types/paymentsControl';

export class PaymentsControlService extends Service {
    public static getPayments(): Promise<AxiosResponse<PaymentsControlResponse>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ data: paymentsResponse } as AxiosResponse<PaymentsControlResponse>)
            }, 500);
        })
    }
}