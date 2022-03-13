import { PoolGetClient } from '../../db';
import { TeamModel, TeamModelCreateArgs } from '../../models/team';
import { TeamPlayerRoleModel, TeamPlayerRoleModelCreateArgs } from '../../models/team-player-role';
import { TeamInfoModel } from '../../models/team-info';

// TODO more types will be added here eventually
type TeamInitializeArgs = TeamModelCreateArgs & Omit<TeamPlayerRoleModelCreateArgs, 'teamId'>;
// TODO somehow add role for crator - it is some id of a player that needs to be passed in
// what is the return type here? is it something generic, or actually id - i would like to use id

export const teamInitialize =
	(getClient: PoolGetClient) =>
	async ({ teamName, playerId, role }: TeamInitializeArgs) => {
		const client = await getClient();

		try {
			await client.query('begin');

			const team = await TeamModel.create(
				{
					teamName,
				},
				client
			);

			await TeamInfoModel.create(
				{
					teamId: team.id,
				},
				client
			);

			await TeamPlayerRoleModel.create(
				{
					playerId,
					teamId: team.id,
					role,
				},
				client
			);

			await client.query('commit');
		} catch (err) {
			await client.query('rollback');
			throw err;
		} finally {
			client.release();
		}
	};
