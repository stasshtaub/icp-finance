type PaymentStatus = "paid" | "sent" | null;

type PaymentsItem = {
	payment: number;
	status?: PaymentStatus;
	invoiceDate: string;
	paymentDate?: string | null;
};

export interface PaymentsControlResponse {
	items: Array<PaymentsItem>;
	count: number;
};

export interface PaymentsControlState {
	data: {
		items: Array<PaymentsItem>;
		count: number;
	}
};
