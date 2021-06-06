import { PaymentDay } from "@/logic/payment";

export type PaymentType = "full" | "instalments";

type PaymentTypeOption = {
  value: PaymentType;
  label: string;
};

export interface PaymentState {
  model: {
    paymentType: PaymentType;
    paymentCount: number | null;
    perPayment: number | null;
    firstPayment: number | null;
    schedule: Array<PaymentDay> | null;
    lastPaymentDate: PaymentDay["date"] | null;
  },

  options: {
    paymentTypes: Array<PaymentTypeOption>;
    maxPayments: number;
  }
}
