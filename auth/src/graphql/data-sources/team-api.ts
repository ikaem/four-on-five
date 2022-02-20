import { PgApi } from '../../services/database/api/api';
import { TeamCreateArgs } from '../../services/database/models/team';
import { PgDataSource } from './pg-data-source';

export class TeamApi extends PgDataSource {
	constructor(dbApi: PgApi) {
		super(dbApi);
	}

	async teamCreate(args: TeamCreateArgs) {
		return await this.dbApi.dbSetters.teamCreate(args);
	}
}
