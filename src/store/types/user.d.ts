type User = {
    firstName: string;
    lastName: string;
    email: string;
    paymentAmount: number;
};

export interface UserState {
    data: User | null
};
