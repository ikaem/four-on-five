import { PoolGetClient } from '../../db';
import { Team, TeamAttributes, TeamCreateArgs } from '../../models/team';

export const teamCreate =
	(getClient: PoolGetClient) =>
	async ({ creatorId, teamName }: TeamCreateArgs): Promise<TeamAttributes> => {
		const client = await getClient();

		try {
			return await Team.createTeam(
				{
					creatorId,
					teamName,
				},
				client
			);

			// TODO curious if error will be rethrown witjhout catch
		} finally {
			client.release();
		}
	};
