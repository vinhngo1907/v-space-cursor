import cors from 'cors';
import { Handler } from 'express';

export const corsMiddleware = (options?: cors.CorsOptions): Handler =>
    cors({
        ...options,
    });
