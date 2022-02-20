// TODO this could get renamed?
// add this later

import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { InMemoryLRUCache, KeyValueCache } from 'apollo-server-caching';
import DataLoader from 'dataloader';
import { PgApi } from '../../services/database/api/api';
import { GQLContext } from '../create-gql-server';
import { PgDataSource } from './pg-data-source';

export class PlayerApi extends PgDataSource {
	constructor(dbApi: PgApi) {
		super(dbApi);
	}

	getPlayer() {}
	invitePlayer() {}
}
