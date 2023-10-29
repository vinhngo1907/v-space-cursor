// require('dotenv').config(); // Load environment variables from .env
import '@app/configs';
import { startHttpServer } from '@app/http.server';
import { defaultLogger } from "@v-libs/node-infrastructure";
import { connectPostgreSqlDataSources } from '@datasource/postgresql';

global.logger = defaultLogger();

const start = async () => {
    await connectPostgreSqlDataSources();
    startHttpServer();
};

start();