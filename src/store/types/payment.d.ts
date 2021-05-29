import { PaymentDay } from "@/logic/payment";

export type PaymentType = "full" | "instalments";
type PaymentTypeOption = {
  value: PaymentType;
  label: string;
};

export interface PaymentState {
  model: {
    paymentType: PaymentType;
    paymentCount: number;
    perPayment: number;
    firstPayment: number | null;
    schedule: Array<PaymentDay> | null;
  },

  options: {
    paymentTypes: Array<PaymentTypeOption>;
    paymentCounts: Array<number>;
  }
}
