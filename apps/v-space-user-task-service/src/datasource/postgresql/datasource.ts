import ORMConfig from 'ormconfig';
import { DataSource } from 'typeorm';

export type PostgresConnectionOPtions = {
    /**
 * @description Use for testing/debugging. This will delete your data after the tests
 */
    dropSchema?: boolean;

    /**
     * @description Automatically run migrations before the tests
     */
    migrationsRun?: boolean;
}

const dataSourceOptions = {
    ...ORMConfig,
}

export const primaryDataSource = new DataSource(dataSourceOptions);

export const connectPostgreSqlDataSources = async (
    options?: PostgresConnectionOPtions
): Promise<void> => {
    Object.assign(dataSourceOptions, {
        dropSchema: options?.dropSchema || false,
        migrationsRun: options?.migrationsRun || false,
    });
    primaryDataSource.setOptions(dataSourceOptions);
    await primaryDataSource.initialize();
}