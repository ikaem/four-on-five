import { PoolGetClient } from '../../db';
import { MatchPlayerTeamModel } from '../../models/match-player-team';

// this is a connector
export interface MatchPlayerTeamForMatchesGetArgs {
	matchIds: readonly number[];
	// TODO this is temp optional until figure out how to handle it in the loader
	limit?: number | null;
}

export const matchPlayerTeamForMatchesGet =
	(getClient: PoolGetClient) =>
	async ({ matchIds, limit = null }: MatchPlayerTeamForMatchesGetArgs) => {
		const client = await getClient();

		try {
			return await MatchPlayerTeamModel.getAllForMatches({ matchIds, limit }, client);
		} finally {
			client.release();
		}
	};
