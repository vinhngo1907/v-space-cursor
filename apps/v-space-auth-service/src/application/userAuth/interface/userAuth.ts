export type UserAuth = {
    id: string;
    fisrtName: string;
    lastName: string;
    password: string;
    email: string;
    phone?: string;
    status: string;

    createdAt: number;
    updatedAt: number;
};

export type SignUpPayload = Omit<
    UserAuth,
    'id' | 'status' | 'createdAt' | 'updatedAt'
>;

export type UserAuthRepsone = Omit<UserAuth, 'password'>;