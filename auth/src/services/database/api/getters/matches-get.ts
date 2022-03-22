import { PoolGetClient } from '../../db';
import { MatchModel } from '../../models/match';

export interface MatchesGetArgs {
	matchIds: readonly number[];
	// TODO this is temp optional until figure out how to handle it in the loader
	limit?: number | null;
}

// TODO in future, this might get optional ids
export const matchesGet =
	(getClient: PoolGetClient) =>
	async ({ matchIds, limit = null }: MatchesGetArgs) => {
		const client = await getClient();

		try {
			return await MatchModel.get({ matchIds, limit }, client);
		} finally {
			client.release();
		}
	};
