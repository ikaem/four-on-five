import { PoolGetClient } from '../../db';
import { MatchTeamModel } from '../../models/match-team';

interface MatchTeamsForMatchesGetArgs {
	matchIds: number[];
	limit: number;
}

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
