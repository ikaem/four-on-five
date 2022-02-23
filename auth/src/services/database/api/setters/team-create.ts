import { PoolGetClient } from '../../db';
import { CreateTeamArgs, Team, TeamAttributes } from '../../models/team';

export const teamCreate =
	(getClient: PoolGetClient) =>
	async ({ creatorId, teamName }: CreateTeamArgs): Promise<TeamAttributes> => {
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
