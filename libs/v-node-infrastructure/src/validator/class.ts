import { ValidationError } from 'class-validator';

import { ValidateClassType } from './types';

export type ValidateErrorProps<T = unknown> = {
    validateClass: ValidateClassType<T>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
    validateErrors: ValidationError[];
    logFirstError?: boolean;
};

export class ValidateError<T = unknown> {
    validateClass: ValidateClassType<T>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
    validateErrors: ValidationError[];
    logFirstError: boolean;

    constructor(props: ValidateErrorProps<T>) {
        Object.assign(this, {
            logFirstError: false,
            ...props,
        });
    }

    get firstErrorMessage(): string {
        const errors = this.validateErrors;
        const firstError = errors[0];
        const constraintKeys = Object.keys(firstError?.constraints || {});

        return firstError?.constraints?.[constraintKeys[0]] || '';
    }

    toJson(): Record<string, string[]> {
        const json: Record<string, string[]> = {};
        const errors = this.validateErrors;

        for (let index = 0; index < errors.length; index++) {
            const { property, constraints = {} } = errors[index];

            json[property] = Object.values(constraints);
        }

        return json;
    }
}
