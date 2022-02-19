// TODO this could get renamed?

import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { InMemoryLRUCache, KeyValueCache } from 'apollo-server-caching';
import DataLoader from 'dataloader';
import { PgApi } from '../../services/database/api/api';
import { User } from '../../services/database/models/user-test';
import { GQLContext } from '../create-gql-server';

export class DbGettersSource extends DataSource<GQLContext> {
	dbApi: PgApi;
	context: GQLContext | undefined;
	cache: KeyValueCache<string> | undefined;
	usersLoader: DataLoader<unknown, User, unknown>;

	constructor(dbApi: PgApi) {
		super();
		this.dbApi = dbApi;
		// TODO does this need await?
		this.usersLoader = new DataLoader((ids) => dbApi.dbGetters.getUsers());
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

	async getUsers(id: number, { ttlInSeconds }: { ttlInSeconds: number }) {
		// TODO we are checking if there is a  document with this id in the cache
		const cachedDoc = await this.cache?.get(this.cacheKey(id));
		if (cachedDoc) {
			const user = JSON.parse(cachedDoc);
			return user;
		}

		const doc = await this.usersLoader.load(id);

		if (ttlInSeconds) {
			this.cache?.set(this.cacheKey(id), JSON.stringify(doc));
		}

		return doc;
	}

	// TODO update dont care much about for now

	// initialize(config) {
	// 	this.context = context;
	// }

	// initialize({ context, cache } = {}) {
	// 	/*
	// 	...
	// 	*/
	// }

	// didEncounterError(error) {}

	// cacheKey(id) {
	// 	// ...
	// }

	// // TODO i guess these are methods we will use to get data
	// async get(id, { ttlInSeconds } = {}) {
	// 	// ...
	// }

	// async update(id, newDoc) {
	// 	// ...
	// }
}
