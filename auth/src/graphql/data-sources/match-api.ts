// import DataLoader from 'dataloader';
import DataLoader from 'dataloader';
import { getResultsMap } from '../../common/utils/get-results-map';
import { PgApi } from '../../services/database/api/api';
import { MatchPlayerTeamForMatchesGetArgs } from '../../services/database/api/getters/match-player-team-for-matches-get';
import { MatchesGetArgs } from '../../services/database/api/getters/matches-get';
import { MatchModelAttributes } from '../../services/database/models/match';
import { MatchPlayerTeamModelAttributes } from '../../services/database/models/match-player-team';
import { PgDataSource } from './pg-data-source';

export class MatchApi extends PgDataSource {
	matchesLoader: DataLoader<number, MatchModelAttributes, number>;

	constructor(db: PgApi) {
		super(db);

		// there might be no need to use the loader in primary queries? assuming this will only be used for a primary query?
		// https://javascript.plainenglish.io/writing-a-node-js-graphql-backend-that-actually-scales-d20c920a4494
		// searc for 'primary queries'
		this.matchesLoader = new DataLoader(async (matchIds: readonly number[]) => {
			const results = await this.db.getters.matchesGet({ matchIds });
			const resultsMap = getResultsMap(results);
			return matchIds.map((id) => resultsMap[id]);
		});
	}

	loadMatches = async ({ matchIds, limit }: MatchesGetArgs) => {
		// funny thing here, we will still always go to get data from the database here on every request? - but ok, not for actually every match, which is better
		const initialResults = await this.db.getters.matchesGet({ matchIds, limit });
		const ids = initialResults.map((r) => r.id);

		console.log({ ids });
		const matches = await this.matchesLoader.loadMany(ids);

		console.log({ matches });

		return matches;
	};

	// TODO this is test
	loadMatch = async (matchId: number) => {
		// this is interesting if this would actually work?
		return await this.matchesLoader.load(matchId);
	};
}

// export class MatchApi extends PgDataSource {
// 	test = () => {
// 		console.log('test');
// 	};
// }
