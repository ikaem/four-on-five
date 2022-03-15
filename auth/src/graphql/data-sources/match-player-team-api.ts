import DataLoader from 'dataloader';
import { PgApi } from '../../services/database/api/api';
import { MatchPlayerTeamForMatchesGetArgs } from '../../services/database/api/getters/match-player-team-for-matches-get';
import { MatchPlayerTeamModelAttributes } from '../../services/database/models/match-player-team';
import { PgDataSource } from './pg-data-source';

export class MatchPlayerTeamApi extends PgDataSource {
	allForMatchesLoader: DataLoader<number, MatchPlayerTeamModelAttributes, number>;

	constructor(db: PgApi) {
		super(db);

		// TODO this should be this.
		this.allForMatchesLoader = new DataLoader(async (matchIds: readonly number[]) => {
			const results = await this.db.dbGetters.matchPlayerTeamForMatchesGet({ matchIds: matchIds });
			const resultsMap = mapResults(results);

			return matchIds.map((id) => resultsMap[id]);
		});
	}

	// async loadPlayers

	// todo just create method here

	// TODO this is only for getting paginated ids for allForMatches - this is to be used in the resolver
	getAllForMatchesIds = async ({ matchIds, limit }: MatchPlayerTeamForMatchesGetArgs) => {
		const results = await this.db.dbGetters.matchPlayerTeamForMatchesGet({ matchIds, limit });
		return results.map((r) => r.id);
	};

	loadAllForMatches = async (matchIds: number[]) => {
		// we could add data to cache here
		// https://blog.graphql.guide/a-deep-dive-on-apollo-data-sources-778618ce06d2
		// we should also get data in the same order as the match ids we passed in
		// const data = this.allForMatchesLoader.loadMany();

		return await this.allForMatchesLoader.loadMany(matchIds);
	};

	// TODO note sure if this is ok?
	loadAllForMatchesTest = async ({ matchIds, limit }: MatchPlayerTeamForMatchesGetArgs) => {
		const initialResults = await this.db.dbGetters.matchPlayerTeamForMatchesGet({
			matchIds,
			limit,
		});
		const ids = initialResults.map((r) => r.id);

		// TODO there is some stuff with unions too?
		// https://github.com/graphql/dataloader/issues/71
		return await this.allForMatchesLoader.loadMany(ids);
	};
}

// TODO move this elsewhere
function mapResults<T extends { id: number }>(results: T[]): Record<number, T> {
	const map: Record<number, T> = {};

	for (const result of results) {
		map[result.id] = result;
	}

	return map;
}
