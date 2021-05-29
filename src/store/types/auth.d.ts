type AuthData = {
    ACCESS_TOKEN: string;
    DOMAIN: string;
    MEMBER_ID: string;
    REFRESH_TOKEN: string;
    EXPIRES_IN?: string;
};

export interface AuthState {
    data: AuthData | null
};
