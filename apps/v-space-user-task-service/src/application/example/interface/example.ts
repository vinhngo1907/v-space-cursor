export type Example = {
    name: string;
    createdAt: number;
    updatedAt: number;
};

export type CreateExamplePayload = Pick<Example, 'name'>;
