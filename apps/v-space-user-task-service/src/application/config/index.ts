import dotenv from "dotenv";

dotenv.config();

const env = process.env;
const { NODE_ENV } = env;

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