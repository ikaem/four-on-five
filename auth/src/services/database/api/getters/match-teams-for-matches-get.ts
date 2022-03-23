import { PoolGetClient } from '../../db';
import { MatchTeamModel } from '../../models/match-team';

interface MatchTeamsForMatchesGetArgs {
	matchIds: number[];
	limit: number;
}

// TODO not sure if i need this aparat from seeding?
// TODO maybe this can be merged with general query in the teams, and we only use connection tables inside sql queries, and not in its own db getters?
// adjust this later

export const matchTeamsForMatchesGet =
	(getClient: PoolGetClient) =>
	async ({ matchIds, limit }: MatchTeamsForMatchesGetArgs) => {
		const client = await getClient();

		try {
			return await MatchTeamModel.getAllForMatches({ matchIds, limit }, client);
		} finally {
			client.release();
		}
	};
