import { PoolGetClient } from '../../db';
import { MatchPlayerTeamModel } from '../../models/match-player-team';

// this is a connector
interface MatchPlayerTeamForMatchesGetArgs {
	matchIds: readonly number[];
	limit: number;
}

export const matchPlayerTeamForMatchesGet =
	(getClient: PoolGetClient) =>
	async ({ matchIds, limit }: MatchPlayerTeamForMatchesGetArgs) => {
		const client = await getClient();

		try {
			return await MatchPlayerTeamModel.getAllForMatches({ matchIds, limit }, client);
		} finally {
			client.release();
		}
	};
