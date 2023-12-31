import '@app/config';

import { startHttpServer } from '@app/http.server';
import { defaultLogger } from '@v-libs/node-infrastructure';
import { connectPostgreSqlDataSources } from 'src/datasource/postgresql/datasource';

global.logger = defaultLogger();

const start = async () => {
    await connectPostgreSqlDataSources();
    startHttpServer();
};

start();