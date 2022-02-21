import { PoolGetClient } from '../../db';
import { Player, PlayerAttributes } from '../../models/player';
import { GetTeamsArgs, Team, TeamAttributes } from '../../models/team';

export const teamsGet =
	(getClient: PoolGetClient) =>
	async ({ limit }: GetTeamsArgs): Promise<TeamAttributes[]> => {
		const client = await getClient();

		try {
			return await Team.getTeams({ limit }, client);
		} finally {
			client.release();
		}
	};
