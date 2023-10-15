// import dotenv from 'dotenv';

// dotenv.config();

import { join } from "path";
import "dotenv/config";

const env = process.env;
const { NODE_ENV } = env;

type JWT_CONFIG = {
    secret: string;
    signOptions: {
        expiresIn: string;
    }
}

type SeedingOptions = {
    seeds: string[];
    factories: string[];
};

export const AppConfig = {
    HttpServer: {
        port: Number(env.HTTP_SERVER_PORT || 8080),
        CORS: {
            origin:
                env.HTTP_SERVER_CORS_ORIGIN || (NODE_ENV === 'development' && '*'),
            method: '*',
            allowedHeaders: '*',
        },
    },
} as const;


class ConfigService {
    constructor(private env: { [k: string]: string | undefined }) { }
    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(key => this.getValue(key, true));
        return this;
    }

    public getPort() {
        return this.getValue('HTTP_SERVER_PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('MODE', true);
    }

    // public getTypeOrmConfig(): TypeOrmMo { }

    public getJwtConfig(): JWT_CONFIG {
        return {
            secret: this.getValue('JWT_SECRET'),
            signOptions: {
                expiresIn: `${this.getValue('JWT_EXPIRATION_TIME')}s` || '60s',
            }
        }
    }
}

const configService = new ConfigService(process.env).ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DB',
    'JWT_SECRET',
    'JWT_EXPIRATION_TIME',
]);

export { configService };