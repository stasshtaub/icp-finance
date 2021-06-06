import { PaymentsControlResponse } from "@/store/types/paymentsControl";

export const paymentsResponse: PaymentsControlResponse = {
    items: [
        {
            invoiceDate: "2021-05-06T21:56:14Z",
            paymentDate: "2021-06-06T21:56:14Z",
            payment: 30000,
            status: "paid"
        },
        {
            invoiceDate: "2021-05-06T21:56:14Z",
            payment: 20000,
            status: "sent"
        },
        {
            invoiceDate: "2021-05-06",
            payment: 60000
        }
    ],
    count: 0
};
