import { PoolGetClient } from '../../db';
import { MatchTeamModel } from '../../models/match-team';

interface MatchTeamsGetArgs {
	limit: number;
}

export const matchTeamsGet =
	(getClient: PoolGetClient) =>
	async ({ limit }: MatchTeamsGetArgs) => {
		const client = await getClient();

		try {
			return await MatchTeamModel.getAll({ limit }, client);
		} finally {
			client.release();
		}
	};
