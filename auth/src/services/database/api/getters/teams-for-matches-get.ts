import { PoolGetClient } from '../../db';
import { TeamModel } from '../../models/team';

export interface TeamsForMatchesGetArgs {
	matchIds: readonly number[];
	// TODO this is temp optional until figure out how to handle it in the loader
	limit?: number | null;
}

// TODO in future, this might get optional ids
export const teamsForMatchesGet =
	(getClient: PoolGetClient) =>
	async ({ matchIds, limit = null }: TeamsForMatchesGetArgs) => {
		const client = await getClient();

		try {
			return await TeamModel.getForMatches({ matchIds, limit }, client);
		} finally {
			client.release();
		}
	};
