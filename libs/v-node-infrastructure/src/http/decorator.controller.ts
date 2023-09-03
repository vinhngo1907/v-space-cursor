import {
    HttpController,
    HttpControllerMethodHander,
    META_DATA
} from "./class.controller";
import { HttpHandleMethod } from "./method.http";

export const Route = (method: HttpHandleMethod, path = "/") => {
    return function (
        target: any,
        name: string,
        descriptor: PropertyDescriptor
    ): void {
        const { constructor } = target;
        const originalHandler = descriptor.value;

        // eslint-disable-next-line no-prototype-builtins
        if (HttpController.isPrototypeOf(constructor)) {
            const httpHandlers =
                Reflect.getOwnMetadata(META_DATA.HttpHandler, target) || [];

            httpHandlers.push({
                method,
                path,
                handler: originalHandler,
                propertyName: name,
            });

            Reflect.defineMetadata(META_DATA.HttpHandler, httpHandlers, target);

            Object.defineProperty(target, name, {
                value: originalHandler,
                writable: true,
            });

            descriptor.value = originalHandler;
        }
    };
};

export const Controller = (path: string) => {
    return function (target: object): void {
        Reflect.defineMetadata(
            META_DATA.DefaultPath,
            path,
            (target as IPrototype).prototype
        );
    };
};

export const Middleware = (handler: HttpControllerMethodHander) => {
    return function (
        target: any,
        name: string,
        descriptor: PropertyDescriptor
    ): void {
        const originalHandler = descriptor.value;

        // eslint-disable-next-line no-prototype-builtins
        if (HttpController.isPrototypeOf(originalHandler)) {
            const controllerMiddlewares =
                Reflect.getMetadata(META_DATA.ControllerMiddleware, target) || [];
            controllerMiddlewares.push(handler);

            Reflect.defineMetadata(
                META_DATA.ControllerMiddleware,
                controllerMiddlewares,
                target
            );
        } else {
            const propertyMiddleware =
                Reflect.getMetadata(META_DATA.PropertyMiddleware, target[name]) || [];

            propertyMiddleware.push(handler);

            Reflect.defineMetadata(
                META_DATA.PropertyMiddleware,
                propertyMiddleware,
                target[name]
            );
        }
    };
};
