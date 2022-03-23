// import DataLoader from 'dataloader';
import DataLoader from 'dataloader';
import { getResultsMap } from '../../common/utils/get-results-map';
import { PgApi } from '../../services/database/api/api';
import { TeamsForMatchesGetArgs } from '../../services/database/api/getters/teams-for-matches-get';
import { TeamModelAttributes } from '../../services/database/models/team';
import { PgDataSource } from './pg-data-source';

export class TeamApi extends PgDataSource {
	teamsForMatchesLoader: DataLoader<number, TeamModelAttributes, number>;

	constructor(db: PgApi) {
		super(db);
		this.teamsForMatchesLoader = new DataLoader(async (matchIds: readonly number[]) => {
			const results = await this.db.getters.teamsForMatchesGet({ matchIds });
			const resultsMap = getResultsMap(results);
			return matchIds.map((id) => resultsMap[id]);
		});
	}

	loadTeamsForMatches = async ({ matchIds, limit }: TeamsForMatchesGetArgs) => {
		// funny thing here, we will still always go to get data from the database here on every request? - but ok, not for actually every match, which is better
		const initialResults = await this.db.getters.teamsForMatchesGet({ matchIds, limit });
		const ids = initialResults.map((r) => r.id);

		// TODO maybe i could use just one to get just one match?
		return await this.teamsForMatchesLoader.loadMany(ids);
	};
}
