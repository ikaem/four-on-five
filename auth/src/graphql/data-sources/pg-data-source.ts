// TODO this could get renamed?
// add this later

import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { InMemoryLRUCache, KeyValueCache } from 'apollo-server-caching';
import { PgApi } from '../../services/database/api/api';
import { GQLContext } from '../create-gql-server';

export class PgDataSource extends DataSource {
	dbApi: PgApi;
	context: GQLContext | undefined;
	cache: KeyValueCache<string> | undefined;

	constructor(dbApi: PgApi) {
		super();
		this.dbApi = dbApi;
	}

	initialize(config: DataSourceConfig<GQLContext>) {
		this.context = config.context;
		// TODO do log this context at some point to see what is up
		this.cache = config.cache || new InMemoryLRUCache();
	}

	// TODO what is the type of error
	// TODO not sure if need this
	// didEncounterError(error: Error) {
	// 	throw error;
	// }

	// TODO not sure which type
	cacheKey(id: string | number) {
		// TODO could pass general string from en var here
		return `${this.dbApi.connectionString}-${id}`;
	}
}
