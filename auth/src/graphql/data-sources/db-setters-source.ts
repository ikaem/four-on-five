// TODO this could get renamed?
// add this later

import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { InMemoryLRUCache, KeyValueCache } from 'apollo-server-caching';
import DataLoader from 'dataloader';
import { PgApi } from '../../services/database/api/api';
import { UserSignupArgs } from '../../services/database/api/setters/user-signup';
import { GQLContext } from '../create-gql-server';

// TODO later, this should not directly extend data source - lets make our own parent one
// TODO this is for delete

export class DbSettersSource extends DataSource<GQLContext> {
	dbApi: PgApi;
	context: GQLContext | undefined;
	cache: KeyValueCache<string> | undefined;

	constructor(dbApi: PgApi) {
		super();
		this.dbApi = dbApi;
	}

	initialize(config: DataSourceConfig<GQLContext>) {
		this.context = config.context;
		this.cache = config.cache || new InMemoryLRUCache();
	}

	// TODO what is the type of error
	didEncounterError(error: Error) {
		throw error;
	}

	// TODO not sure which type
	cacheKey(id: string | number) {
		return `${this.dbApi.connectionString}-${id}`;
	}

	async userSignup({ firstName, lastName, email, password, authType }: UserSignupArgs) {
		// TODO where to handle errors from?
		// i should handle it from here, beucase i will have some logger here for errors?

		// try {
		// TODO i prolly want to do this error handling an d logging in the resolver, all the way up top
		return await this.dbApi.dbSetters.userSignup({
			firstName,
			lastName,
			email,
			password,
			authType,
		});
		// } catch (err) {
		// 	this.didEncounterError(err as Error);
		// }
	}
}
