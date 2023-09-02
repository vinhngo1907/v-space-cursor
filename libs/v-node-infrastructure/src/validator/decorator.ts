import { HttpControllerMethodHander, Middleware } from '../http';
import { ClassTransformOptions } from 'class-transformer';
import { transformAndValidate } from 'class-transformer-validator';
import { ValidatorOptions } from 'class-validator';

import { ValidateError } from './class';
import { ValidateClassType } from './types';

export const HttpBodyValidate = <T extends object>(
    validateClass: ValidateClassType<T>,
    options?: {
        validator?: ValidatorOptions;
        transformer?: ClassTransformOptions;
    }
): ReturnType<typeof Middleware> => {
    const handler: HttpControllerMethodHander = async (req, _, next) => {
        const body = req.body || {};
        await transformAndValidate(validateClass, body, options)
            .then(transform => {
                req.body = transform;
                next();
            })
            .catch(err => {
                const validateError = new ValidateError({
                    validateClass,
                    payload: body,
                    validateErrors: err,
                    logFirstError: options?.validator?.stopAtFirstError,
                });

                next(validateError);
            });
    };

    return Middleware(handler);
};
